import React from 'react';
import _ from 'lodash';

import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';

import TouristObjectsList from './TouristObjectsList';

const TouristObjectsListContainer = ({id, isRemoveRecommend}: TTouristObjectsListContainerProps) => {
	// const chatTime = useStoreSelector(selectRunningChatsVideoTimeById, {chatId: chatId ?? ''});

	const onDelete = () => console.log('log');

	return (
		<TouristObjectsList
			isRemoveRecommend={isRemoveRecommend}
			onAscStatus={onDelete}
			onDecStatus={onDelete}
			onResetStatus={onDelete}
		/>
	);
};

type TTouristObjectsListContainerProps = {
	id: string;
	isRemoveRecommend?: boolean;
};

export default TouristObjectsListContainer;
