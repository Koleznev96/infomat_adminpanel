import {put, call} from 'typed-redux-saga';

import {placesClientOnlyActions} from '@infomat/core/src/Redux/Places/Actions/placesClientOnlyActions';
import {placesClientToServerActions} from '@infomat/core/src/Redux/Places/Actions/placesClientToServerActions';
import {getNavigationContext} from '@infomat/core/src/Redux/sagaContext';
import notificationsClientOnlyActions from '@infomat/core/src/Redux/Notifications/Actions/notificationsClientOnlyActions';
import {EnumNotificationSeverity} from '@infomat/uikit/src/Notification/EnumNotificationSeverity';
import {placesService} from '@infomat/core/src/Services/Api/places.service';

const updateItemSaga = function* ({payload}: ReturnType<typeof placesClientToServerActions.updateCategory>) {
	try {
		const {goTouristObjects} = yield* getNavigationContext();
		yield placesService.updateItem(payload);
		yield put(
			notificationsClientOnlyActions.enqueuePersistent({
				notificationTitle: 'Туристический объект успешно обновлен',
				duration: 5000,
				severity: EnumNotificationSeverity.SUCCESS,
			}),
		);
		yield* call(goTouristObjects);
	} catch (error) {
		yield* put(placesClientOnlyActions.stopLoading());
	}
};

export default updateItemSaga;
