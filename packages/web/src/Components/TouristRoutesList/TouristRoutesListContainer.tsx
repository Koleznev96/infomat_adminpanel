import React from 'react';
import _ from 'lodash';

import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';

import TouristRoutesList from './TouristRoutesList';

const TouristRoutesListContainer = () => {
	// const chatTime = useStoreSelector(selectRunningChatsVideoTimeById, {chatId: chatId ?? ''});

	const onDelete = () => console.log('log');

	return <TouristRoutesList onAscStatus={onDelete} onDecStatus={onDelete} onResetStatus={onDelete} />;
};

export default TouristRoutesListContainer;
