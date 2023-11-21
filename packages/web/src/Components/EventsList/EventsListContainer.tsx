import React from 'react';
import _ from 'lodash';

import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';

import EventsList from './EventsList';

const EventsListContainer = ({id}: TEventsListContainerProps) => {
	// const chatTime = useStoreSelector(selectRunningChatsVideoTimeById, {chatId: chatId ?? ''});

	const onDelete = () => console.log('log');

	return (
		<EventsList
			onAscDate={onDelete}
			onDecDate={onDelete}
			onResetDate={onDelete}
			onAscStatus={onDelete}
			onDecStatus={onDelete}
			onResetStatus={onDelete}
		/>
	);
};

type TEventsListContainerProps = {
	id: string;
};

export default EventsListContainer;
