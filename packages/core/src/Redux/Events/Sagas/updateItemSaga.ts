import {put} from 'typed-redux-saga';
import {AxiosResponse} from 'axios';

import {eventsClientOnlyActions} from '@infomat/core/src/Redux/Events/Actions/eventsClientOnlyActions';
import {eventsClientToServerActions} from '@infomat/core/src/Redux/Events/Actions/eventsClientToServerActions';
import notificationsClientOnlyActions from '@infomat/core/src/Redux/Notifications/Actions/notificationsClientOnlyActions';
import {EnumNotificationSeverity} from '@infomat/uikit/src/Notification/EnumNotificationSeverity';
import {eventsService} from '@infomat/core/src/Services/Api/events.service';
import {TRespounseData} from '@infomat/core/src/Types/PartialBy';
import {TEventsVM} from '@infomat/core/src/Redux/Events/entityAdapter';

const updateItemSaga = function* ({payload}: ReturnType<typeof eventsClientToServerActions.updateCategory>) {
	try {
		const response: AxiosResponse = yield eventsService.updateItem(payload);
		const data: TRespounseData<TEventsVM> = response.data;

		yield* put(eventsClientOnlyActions.setData(data.data));

		yield put(
			notificationsClientOnlyActions.enqueuePersistent({
				notificationTitle: 'Мероприятие успешно обновлено',
				duration: 5000,
				severity: EnumNotificationSeverity.SUCCESS,
			}),
		);
	} catch (error) {
		yield* put(eventsClientOnlyActions.stopLoading());
	}
};

export default updateItemSaga;
