import {put, call} from 'typed-redux-saga';

import {eventsClientOnlyActions} from '@infomat/core/src/Redux/Events/Actions/eventsClientOnlyActions';
import {eventsClientToServerActions} from '@infomat/core/src/Redux/Events/Actions/eventsClientToServerActions';
import notificationsClientOnlyActions from '@infomat/core/src/Redux/Notifications/Actions/notificationsClientOnlyActions';
import {EnumNotificationSeverity} from '@infomat/uikit/src/Notification/EnumNotificationSeverity';
import {eventsService} from '@infomat/core/src/Services/Api/events.service';
import {getNavigationContext} from '@infomat/core/src/Redux/sagaContext';

const deleteItemSaga = function* ({payload}: ReturnType<typeof eventsClientToServerActions.deleteCategory>) {
	try {
		const {goEvents} = yield* getNavigationContext();
		yield eventsService.deleteItem(payload.id);
		yield put(
			notificationsClientOnlyActions.enqueuePersistent({
				notificationTitle: 'Мероприятие успешно удалено',
				duration: 5000,
				severity: EnumNotificationSeverity.SUCCESS,
			}),
		);
		yield* call(goEvents);
	} catch (error) {
		yield* put(eventsClientOnlyActions.stopLoading());
	}
};

export default deleteItemSaga;
