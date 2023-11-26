import {put, call} from 'typed-redux-saga';

import {routesClientOnlyActions} from '@infomat/core/src/Redux/Routes/Actions/routesClientOnlyActions';
import {routesClientToServerActions} from '@infomat/core/src/Redux/Routes/Actions/routesClientToServerActions';
import {getNavigationContext} from '@infomat/core/src/Redux/sagaContext';
import notificationsClientOnlyActions from '@infomat/core/src/Redux/Notifications/Actions/notificationsClientOnlyActions';
import {EnumNotificationSeverity} from '@infomat/uikit/src/Notification/EnumNotificationSeverity';
import {routesService} from '@infomat/core/src/Services/Api/routes.service';

const updateItemSaga = function* ({payload}: ReturnType<typeof routesClientToServerActions.updateCategory>) {
	try {
		const {goTouristRoutes} = yield* getNavigationContext();
		yield routesService.updateItem(payload);
		yield put(
			notificationsClientOnlyActions.enqueuePersistent({
				notificationTitle: 'Туристический маршрут успешно обновлен',
				duration: 5000,
				severity: EnumNotificationSeverity.SUCCESS,
			}),
		);
		yield* call(goTouristRoutes);
	} catch (error) {
		yield* put(routesClientOnlyActions.stopLoading());
	}
};

export default updateItemSaga;
