import React from 'react';
import _ from 'lodash';

import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';

import TouristObjectItem from './TouristObjectItem';

const categoryObjectVMConst = {
	id: 'sfs',
	background: 'https://coolsen.ru/wp-content/uploads/2021/12/NO-20211223_142620-6.jpg',
	icon: 'https://e7.pngegg.com/pngimages/324/887/png-clipart-computer-icons-house-graphics-home-house.png',
	label: 'счмисчмисчмичмси',
};

const TouristObjectItemContainer = ({id, isRemoveRecommend}: TTouristObjectItemContainerProps) => {
	// const chatTime = useStoreSelector(selectRunningChatsVideoTimeById, {chatId: chatId ?? ''});
	const touristObjectVM = categoryObjectVMConst;

	if (_.isUndefined(touristObjectVM)) {
		return null;
	}

	const onDelete = () => console.log('log');

	const onDeleteRecommend = () => console.log('log');

	return (
		<TouristObjectItem
			isRemoveRecommend={isRemoveRecommend}
			touristObjectVM={touristObjectVM}
			onDelete={isRemoveRecommend ? onDeleteRecommend : onDelete}
		/>
	);
};

type TTouristObjectItemContainerProps = {
	id: string;
	isRemoveRecommend?: boolean;
};

export default TouristObjectItemContainer;
