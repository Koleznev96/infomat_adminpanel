import {put, call} from 'typed-redux-saga';

import {routesClientOnlyActions} from '@infomat/core/src/Redux/Routes/Actions/routesClientOnlyActions';
import {routesClientToServerActions} from '@infomat/core/src/Redux/Routes/Actions/routesClientToServerActions';
import notificationsClientOnlyActions from '@infomat/core/src/Redux/Notifications/Actions/notificationsClientOnlyActions';
import {EnumNotificationSeverity} from '@infomat/uikit/src/Notification/EnumNotificationSeverity';
import {getNavigationContext} from '@infomat/core/src/Redux/sagaContext';
import {routesService} from '@infomat/core/src/Services/Api/routes.service';

const deleteItemSaga = function* ({payload}: ReturnType<typeof routesClientToServerActions.deleteCategory>) {
	try {
		const {goTouristRoutes} = yield* getNavigationContext();
		yield routesService.deleteItem(payload.id);
		yield put(
			notificationsClientOnlyActions.enqueuePersistent({
				notificationTitle: 'Туристический маршрут успешно удален',
				duration: 5000,
				severity: EnumNotificationSeverity.SUCCESS,
			}),
		);
		yield* call(goTouristRoutes);
	} catch (error) {
		yield* put(routesClientOnlyActions.stopLoading());
	}
};

export default deleteItemSaga;
