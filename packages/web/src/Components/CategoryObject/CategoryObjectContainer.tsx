import React from 'react';
import _ from 'lodash';

import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';

import CategoryObject from './CategoryObject';

const CategoryObjectContainer = ({id}: TCategoryObjectContainerProps) => {
	// const chatTime = useStoreSelector(selectRunningChatsVideoTimeById, {chatId: chatId ?? ''});

	const onDelete = () => console.log('log');

	return <CategoryObject onSubmit={onDelete} onDelete={onDelete} />;
};

type TCategoryObjectContainerProps = {
	id: string;
};

export default CategoryObjectContainer;
