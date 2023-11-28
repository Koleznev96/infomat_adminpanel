import {put} from 'typed-redux-saga';
import {AxiosResponse} from 'axios';

import {routesClientOnlyActions} from '@infomat/core/src/Redux/Routes/Actions/routesClientOnlyActions';
import {routesClientToServerActions} from '@infomat/core/src/Redux/Routes/Actions/routesClientToServerActions';
import notificationsClientOnlyActions from '@infomat/core/src/Redux/Notifications/Actions/notificationsClientOnlyActions';
import {EnumNotificationSeverity} from '@infomat/uikit/src/Notification/EnumNotificationSeverity';
import {routesService} from '@infomat/core/src/Services/Api/routes.service';
import {TRespounseData} from '@infomat/core/src/Types/PartialBy';
import {TRoutesVM} from '@infomat/core/src/Redux/Routes/entityAdapter';

const updateItemSaga = function* ({payload}: ReturnType<typeof routesClientToServerActions.updateCategory>) {
	try {
		const response: AxiosResponse = yield routesService.updateItem(payload);
		const data: TRespounseData<TRoutesVM> = response.data;

		yield* put(routesClientOnlyActions.setData(data.data));

		yield put(
			notificationsClientOnlyActions.enqueuePersistent({
				notificationTitle: 'Туристический маршрут успешно обновлен',
				duration: 5000,
				severity: EnumNotificationSeverity.SUCCESS,
			}),
		);
	} catch (error) {
		yield* put(routesClientOnlyActions.stopLoading());
	}
};

export default updateItemSaga;
