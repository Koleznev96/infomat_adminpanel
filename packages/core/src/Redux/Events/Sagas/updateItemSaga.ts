import {put, call} from 'typed-redux-saga';

import {eventsClientOnlyActions} from '@infomat/core/src/Redux/Events/Actions/eventsClientOnlyActions';
import {eventsClientToServerActions} from '@infomat/core/src/Redux/Events/Actions/eventsClientToServerActions';
import {getNavigationContext} from '@infomat/core/src/Redux/sagaContext';
import notificationsClientOnlyActions from '@infomat/core/src/Redux/Notifications/Actions/notificationsClientOnlyActions';
import {EnumNotificationSeverity} from '@infomat/uikit/src/Notification/EnumNotificationSeverity';
import {eventsService} from '@infomat/core/src/Services/Api/events.service';

const updateItemSaga = function* ({payload}: ReturnType<typeof eventsClientToServerActions.updateCategory>) {
	try {
		const {goEvents} = yield* getNavigationContext();
		yield eventsService.updateItem(payload);
		yield put(
			notificationsClientOnlyActions.enqueuePersistent({
				notificationTitle: 'Мероприятие успешно обновлено',
				duration: 5000,
				severity: EnumNotificationSeverity.SUCCESS,
			}),
		);
		yield* call(goEvents);
	} catch (error) {
		yield* put(eventsClientOnlyActions.stopLoading());
	}
};

export default updateItemSaga;
