import React from 'react';
import _ from 'lodash';

import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';

import SubcategoryObject from './SubcategoryObject';

const SubcategoryObjectContainer = ({id}: TSubcategoryObjectContainerProps) => {
	// const chatTime = useStoreSelector(selectRunningChatsVideoTimeById, {chatId: chatId ?? ''});

	const onDelete = () => console.log('log');

	return <SubcategoryObject onSubmit={onDelete} onDelete={onDelete} />;
};

type TSubcategoryObjectContainerProps = {
	id: string;
};

export default SubcategoryObjectContainer;
