import React from 'react';
import _ from 'lodash';

import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';
import useActionDispatcher from '@infomat/core/src/Hooks/useActionDispatcher';
import {selectEventsTotalPages} from '@infomat/core/src/Redux/Events/Selectors/selectEventsTotalPages';
import {selectEventsSizePage} from '@infomat/core/src/Redux/Events/Selectors/selectEventsSizePage';
import {selectEventsSearch} from '@infomat/core/src/Redux/Events/Selectors/selectEventsSearch';
import {selectEventsIsLoading} from '@infomat/core/src/Redux/Events/Selectors/selectEventsIsLoading';
import {selectEventsCurrentPage} from '@infomat/core/src/Redux/Events/Selectors/selectEventsCurrentPage';
import {selectEventsIds} from '@infomat/core/src/Redux/Events/Selectors/defaultSelectors';
import {eventsClientToServerActions} from '@infomat/core/src/Redux/Events/Actions/eventsClientToServerActions';
import {selectEventsStartDate} from '@infomat/core/src/Redux/Events/Selectors/selectEventsStartDate';
import {selectEventsStatus} from '@infomat/core/src/Redux/Events/Selectors/selectEventsStatus';

import EventsList from './EventsList';

const EventsListContainer = () => {
	const totalPage = useStoreSelector(selectEventsTotalPages);
	const size = useStoreSelector(selectEventsSizePage);
	const search = useStoreSelector(selectEventsSearch);
	const isLoading = useStoreSelector(selectEventsIsLoading);
	const currentPage = useStoreSelector(selectEventsCurrentPage);
	const status = useStoreSelector(selectEventsStatus);
	const startDate = useStoreSelector(selectEventsStartDate);
	const eventsIds = useStoreSelector(selectEventsIds);
	const getData = useActionDispatcher(eventsClientToServerActions.getList);

	return (
		<EventsList
			eventsIds={eventsIds}
			currentPage={currentPage}
			isLoading={isLoading}
			search={search}
			size={size}
			totalPage={totalPage}
			getData={getData}
			status={status}
			startDate={startDate}
		/>
	);
};

export default EventsListContainer;
