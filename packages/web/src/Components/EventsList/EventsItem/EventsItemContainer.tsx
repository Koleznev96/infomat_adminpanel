import React from 'react';
import _ from 'lodash';

import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';

import EventsItem from './EventsItem';

const categoryObjectVMConst = {
	id: 'sfs',
	background: 'https://coolsen.ru/wp-content/uploads/2021/12/NO-20211223_142620-6.jpg',
	icon: 'https://e7.pngegg.com/pngimages/324/887/png-clipart-computer-icons-house-graphics-home-house.png',
	label: 'счмисчмисчмичмси',
};

const EventsItemContainer = ({id}: TEventsItemContainerProps) => {
	// const chatTime = useStoreSelector(selectRunningChatsVideoTimeById, {chatId: chatId ?? ''});
	const eventVM = categoryObjectVMConst;

	if (_.isUndefined(eventVM)) {
		return null;
	}

	const onDelete = () => console.log('log');

	return <EventsItem eventVM={eventVM} onDelete={onDelete} />;
};

type TEventsItemContainerProps = {
	id: string;
};

export default EventsItemContainer;
