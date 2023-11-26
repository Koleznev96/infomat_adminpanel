import React from 'react';
import _ from 'lodash';

import {selectEventsVMById} from '@infomat/core/src/Redux/Events/Selectors/defaultSelectors';
import {eventsClientToServerActions} from '@infomat/core/src/Redux/Events/Actions/eventsClientToServerActions';
import useActionDispatcher from '@infomat/core/src/Hooks/useActionDispatcher';
import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';

import EventsItem from './EventsItem';

const EventsItemContainer = ({id}: TEventsItemContainerProps) => {
	const eventVM = useStoreSelector(selectEventsVMById, id);
	const onDelete = useActionDispatcher(eventsClientToServerActions.deleteCategory);

	if (_.isUndefined(eventVM)) {
		return null;
	}

	return <EventsItem id={id} eventVM={eventVM} onDelete={onDelete} />;
};

type TEventsItemContainerProps = {
	id: number;
};

export default EventsItemContainer;
