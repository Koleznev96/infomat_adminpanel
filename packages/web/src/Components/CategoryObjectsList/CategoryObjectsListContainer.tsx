import React from 'react';
import _ from 'lodash';

import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';

import CategoryObjectsList from './CategoryObjectsList';

const CategoryObjectsListContainer = () => {
	// const chatTime = useStoreSelector(selectRunningChatsVideoTimeById, {chatId: chatId ?? ''});

	const onDelete = () => console.log('log');

	return <CategoryObjectsList onSubmit={onDelete} onDelete={onDelete} />;
};

export default CategoryObjectsListContainer;
