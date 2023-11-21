import React from 'react';
import _ from 'lodash';

import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';

import TouristObject from './TouristObject';

const TouristObjectContainer = ({id}: TTouristObjectContainerProps) => {
	// const chatTime = useStoreSelector(selectRunningChatsVideoTimeById, {chatId: chatId ?? ''});

	const onDelete = () => console.log('log');

	return <TouristObject onSubmit={onDelete} onDelete={onDelete} />;
};

type TTouristObjectContainerProps = {
	id: string;
};

export default TouristObjectContainer;
