import {put, call, take} from 'typed-redux-saga';
import {AxiosResponse} from 'axios';

import {eventsClientOnlyActions} from '@infomat/core/src/Redux/Events/Actions/eventsClientOnlyActions';
import {eventsClientToServerActions} from '@infomat/core/src/Redux/Events/Actions/eventsClientToServerActions';
import {getNavigationContext} from '@infomat/core/src/Redux/sagaContext';
import notificationsClientOnlyActions from '@infomat/core/src/Redux/Notifications/Actions/notificationsClientOnlyActions';
import {EnumNotificationSeverity} from '@infomat/uikit/src/Notification/EnumNotificationSeverity';
import {eventsService} from '@infomat/core/src/Services/Api/events.service';
import {TRespounseData} from '@infomat/core/src/Types/PartialBy';
import {TEventsVM} from '@infomat/core/src/Redux/Events/entityAdapter';

const createItemSaga = function* ({payload}: ReturnType<typeof eventsClientToServerActions.createCategory>) {
	try {
		const {goEvent} = yield* getNavigationContext();

		const response: AxiosResponse = yield eventsService.createItem(payload);
		const data: TRespounseData<TEventsVM> = response.data;

		yield* call(goEvent, data.data.id);

		yield* take(eventsClientOnlyActions.setData.type);
		yield put(
			notificationsClientOnlyActions.enqueuePersistent({
				notificationTitle: 'Мероприятие успешно создано',
				duration: 5000,
				severity: EnumNotificationSeverity.SUCCESS,
			}),
		);
	} catch (error) {
		yield* put(eventsClientOnlyActions.stopLoading());
	}
};

export default createItemSaga;
