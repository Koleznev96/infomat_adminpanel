import axios, {AxiosError} from 'axios';

import {userClientOnlyActions} from '@infomat/core/src/Redux/User/Actions/userClientOnlyActions';
import store from '@infomat/web/src/Redux/store';
import notificationsClientOnlyActions from '@infomat/core/src/Redux/Notifications/Actions/notificationsClientOnlyActions';
import {EnumNotificationSeverity} from '@infomat/uikit/src/Notification/EnumNotificationSeverity';
import ServiceFactory from '../ServiceFactory';

const config = {
	baseURL: process.env.REACT_APP_URL_API || 'https://5f8104486938.vps.myjino.ru/api',
	timeout: 5000,
	withCredentials: true,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'multipart/form-data',
	},
	maxRedirects: 0,
};

const api = axios.create(config);

api.defaults.withCredentials = true;

api.interceptors.response.use(
	(response) => {
		return response;
	},
	(error: AxiosError<{data: null | any; errors: {details: string}[]}>) => {
		if (error.code === '401') {
			localStorage.setItem('isLogin', 'false');
			store.dispatch(userClientOnlyActions.logout());
			return error;
		} else {
			const data: {data: null | any; errors: {details: string}[]} | undefined = error.response?.data;
			store.dispatch(
				notificationsClientOnlyActions.enqueuePersistent({
					message: data?.errors ? data?.errors[0]?.details : error.message,
					notificationTitle: 'Server error',
					isNotAutoClose: true,
					duration: 8000,
					severity: EnumNotificationSeverity.ERROR,
				}),
			);
		}

		return Promise.reject(error);
	},
);

export default api;
