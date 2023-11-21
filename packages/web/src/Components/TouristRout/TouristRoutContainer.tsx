import React from 'react';
import _ from 'lodash';

import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';

import TouristRout from './TouristRout';

const TouristRoutContainer = ({id}: TTouristRoutContainerProps) => {
	// const chatTime = useStoreSelector(selectRunningChatsVideoTimeById, {chatId: chatId ?? ''});

	const onDelete = () => console.log('log');

	return <TouristRout onSubmit={onDelete} onDelete={onDelete} />;
};

type TTouristRoutContainerProps = {
	id: string;
};

export default TouristRoutContainer;
