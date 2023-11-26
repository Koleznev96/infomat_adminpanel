import {put} from 'typed-redux-saga';
import {AxiosResponse} from 'axios';

import {eventsClientOnlyActions} from '@infomat/core/src/Redux/Events/Actions/eventsClientOnlyActions';
import {eventsClientToServerActions} from '@infomat/core/src/Redux/Events/Actions/eventsClientToServerActions';
import {TRespounseData} from '@infomat/core/src/Types/PartialBy';
import {TEventsCreate} from '@infomat/core/src/Redux/Events/entityAdapter';
import {eventsService} from '@infomat/core/src/Services/Api/events.service';

const getDataSaga = function* ({payload}: ReturnType<typeof eventsClientToServerActions.get>) {
	try {
		const response: AxiosResponse = yield eventsService.getItem(payload);
		const data: TRespounseData<TEventsCreate> = response.data;
		yield* put(eventsClientOnlyActions.setData(data.data));
	} catch (error) {
		yield* put(eventsClientOnlyActions.stopLoading());
	}
};

export default getDataSaga;
