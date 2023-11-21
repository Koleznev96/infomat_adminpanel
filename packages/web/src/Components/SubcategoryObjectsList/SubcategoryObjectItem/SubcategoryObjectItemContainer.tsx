import React from 'react';
import _ from 'lodash';

import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';

import SubcategoryObjectItem from './SubcategoryObjectItem';

const categoryObjectVMConst = {
	id: 'sfs',
	background: 'https://coolsen.ru/wp-content/uploads/2021/12/NO-20211223_142620-6.jpg',
	icon: 'https://e7.pngegg.com/pngimages/324/887/png-clipart-computer-icons-house-graphics-home-house.png',
	label: 'счмисчмисчмичмси',
};

const SubcategoryObjectItemContainer = ({id}: TSubcategoryObjectItemContainerProps) => {
	// const chatTime = useStoreSelector(selectRunningChatsVideoTimeById, {chatId: chatId ?? ''});

	const categoryObjectVM = categoryObjectVMConst;

	if (_.isUndefined(categoryObjectVM)) {
		return null;
	}

	const onDelete = () => console.log('log');

	return <SubcategoryObjectItem categoryObjectVM={categoryObjectVMConst} onDelete={onDelete} />;
};

type TSubcategoryObjectItemContainerProps = {
	id: string;
};

export default SubcategoryObjectItemContainer;
