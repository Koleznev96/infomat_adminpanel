import {put, select} from 'typed-redux-saga';
import {AxiosResponse} from 'axios';
import _ from 'lodash';

import {TRespounse} from '@infomat/core/src/Types/PartialBy';
import {selectEventsSizePage} from '@infomat/core/src/Redux/Events/Selectors/selectEventsSizePage';
import {selectEventsCurrentPage} from '@infomat/core/src/Redux/Events/Selectors/selectEventsCurrentPage';
import {selectEventsSearch} from '@infomat/core/src/Redux/Events/Selectors/selectEventsSearch';
import {selectEventsStatus} from '@infomat/core/src/Redux/Events/Selectors/selectEventsStatus';
import {selectEventsStartDate} from '@infomat/core/src/Redux/Events/Selectors/selectEventsStartDate';
import {TEventsVM} from '@infomat/core/src/Redux/Events/entityAdapter';
import {eventsClientOnlyActions} from '@infomat/core/src/Redux/Events/Actions/eventsClientOnlyActions';
import {eventsClientToServerActions} from '@infomat/core/src/Redux/Events/Actions/eventsClientToServerActions';
import {eventsService} from '@infomat/core/src/Services/Api/events.service';

const getListSaga = function* ({
	payload: {size, page, search, status, startDate},
}: ReturnType<typeof eventsClientToServerActions.getList>) {
	try {
		const sizeUp = yield* select(selectEventsSizePage);
		const pageUp = yield* select(selectEventsCurrentPage);
		const searchUp = yield* select(selectEventsSearch);
		const statusUp = yield* select(selectEventsStatus);
		const startDateUp = yield* select(selectEventsStartDate);
		const response: AxiosResponse = yield eventsService.getList({
			size: size ?? sizeUp,
			page: page ?? pageUp,
			search: search ?? searchUp,
			status: _.isUndefined(status) ? statusUp : status,
			startDate: _.isUndefined(startDate) ? startDateUp : startDate,
		});
		const del = size || sizeUp;
		const data: TRespounse<TEventsVM> = response.data;
		yield* put(eventsClientOnlyActions.setTotalPages(Math.ceil(data.total / del)));
		yield* put(eventsClientOnlyActions.upsertMany(data.rows));
	} catch (error) {
		yield* put(eventsClientOnlyActions.stopLoading());
	}
};

export default getListSaga;
