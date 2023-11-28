import {put, call, take} from 'typed-redux-saga';
import {AxiosResponse} from 'axios';

import {routesClientOnlyActions} from '@infomat/core/src/Redux/Routes/Actions/routesClientOnlyActions';
import {routesClientToServerActions} from '@infomat/core/src/Redux/Routes/Actions/routesClientToServerActions';
import {getNavigationContext} from '@infomat/core/src/Redux/sagaContext';
import notificationsClientOnlyActions from '@infomat/core/src/Redux/Notifications/Actions/notificationsClientOnlyActions';
import {EnumNotificationSeverity} from '@infomat/uikit/src/Notification/EnumNotificationSeverity';
import {routesService} from '@infomat/core/src/Services/Api/routes.service';
import {TRespounseData} from '@infomat/core/src/Types/PartialBy';
import {TRoutesVM} from '@infomat/core/src/Redux/Routes/entityAdapter';

const createItemSaga = function* ({payload}: ReturnType<typeof routesClientToServerActions.createCategory>) {
	try {
		const {goTouristRout} = yield* getNavigationContext();

		const response: AxiosResponse = yield routesService.createItem(payload);
		const data: TRespounseData<TRoutesVM> = response.data;

		yield* call(goTouristRout, data.data.id);

		yield* take(routesClientOnlyActions.setData.type);
		yield put(
			notificationsClientOnlyActions.enqueuePersistent({
				notificationTitle: 'Туристический маршрут успешно создан',
				duration: 5000,
				severity: EnumNotificationSeverity.SUCCESS,
			}),
		);
	} catch (error) {
		yield* put(routesClientOnlyActions.stopLoading());
	}
};

export default createItemSaga;
