import axios, {AxiosError} from 'axios';
import _ from 'lodash';

import {userClientOnlyActions} from '@infomat/core/src/Redux/User/Actions/userClientOnlyActions';
import store from '@infomat/web/src/Redux/store';
import notificationsClientOnlyActions from '@infomat/core/src/Redux/Notifications/Actions/notificationsClientOnlyActions';
import {EnumNotificationSeverity} from '@infomat/uikit/src/Notification/EnumNotificationSeverity';
import ServiceFactory from '../ServiceFactory';

// Получаем текущий URL
const currentUrl = window.location.href;

// Обрабатываем текущий URL, чтобы получить основной URL
const parsedUrl = new URL(currentUrl);
const baseUrl = parsedUrl.origin;

const isDevUrl = baseUrl === 'http://localhost:3000' ? 'http://admin.smolenskis.site/api' : `${baseUrl}/api`;

const config = {
	baseURL: isDevUrl,
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
		if (error?.response?.status === 401) {
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

export function replaceEmptyStringsWithUndefined(obj: any) {
	// Используем рекурсивную функцию для обхода всех ключей объекта
	function recursiveUpdate(obj: any) {
		_.forOwn(obj, (value, key) => {
			if (_.isObject(value)) {
				recursiveUpdate(value); // Рекурсивно вызываем функцию для вложенных объектов
			} else if (value === '') {
				obj[key] = null; // Заменяем пустую строку на undefined
			}
		});
	}

	// Клонируем исходный объект для избегания мутации
	const clonedObj = _.cloneDeep(obj);

	// Вызываем рекурсивную функцию для обновления ключей
	recursiveUpdate(clonedObj);

	return clonedObj;
}

export default api;
