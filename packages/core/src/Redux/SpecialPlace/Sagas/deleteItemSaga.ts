import {put, call} from 'typed-redux-saga';

import {specialPlacesClientToServerActions} from '@infomat/core/src/Redux/SpecialPlace/Actions/specialPlacesClientToServerActions';
import {specialPlacesClientOnlyActions} from '@infomat/core/src/Redux/SpecialPlace/Actions/specialPlacesClientOnlyActions';
import notificationsClientOnlyActions from '@infomat/core/src/Redux/Notifications/Actions/notificationsClientOnlyActions';
import {EnumNotificationSeverity} from '@infomat/uikit/src/Notification/EnumNotificationSeverity';
import {getNavigationContext} from '@infomat/core/src/Redux/sagaContext';
import {specialPlacesService} from '@infomat/core/src/Services/Api/specialPlaces.service';

const deleteItemSaga = function* ({payload}: ReturnType<typeof specialPlacesClientToServerActions.deleteCategory>) {
	try {
		const {goSpecialPlaces} = yield* getNavigationContext();
		yield specialPlacesService.deleteItem(payload.id);
		yield put(
			notificationsClientOnlyActions.enqueuePersistent({
				notificationTitle: 'Объект успешно удален',
				duration: 5000,
				severity: EnumNotificationSeverity.SUCCESS,
			}),
		);
		yield* call(goSpecialPlaces);
	} catch (error) {
		yield* put(specialPlacesClientOnlyActions.stopLoading());
	}
};

export default deleteItemSaga;
