import React from 'react';
import _ from 'lodash';

import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';

import SubcategoryObjectsList from './SubcategoryObjectsList';

const SubcategoryObjectsListContainer = () => {
	// const chatTime = useStoreSelector(selectRunningChatsVideoTimeById, {chatId: chatId ?? ''});

	const onDelete = () => console.log('log');

	return <SubcategoryObjectsList onSubmit={onDelete} onDelete={onDelete} />;
};

export default SubcategoryObjectsListContainer;
