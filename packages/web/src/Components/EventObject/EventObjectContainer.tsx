import React from 'react';
import _ from 'lodash';

import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';

import EventObject from './EventObject';

const EventObjectContainer = ({id}: TEventObjectContainerProps) => {
	// const chatTime = useStoreSelector(selectRunningChatsVideoTimeById, {chatId: chatId ?? ''});

	const onDelete = () => console.log('log');

	return <EventObject onSubmit={onDelete} onDelete={onDelete} />;
};

type TEventObjectContainerProps = {
	id: string;
};

export default EventObjectContainer;
