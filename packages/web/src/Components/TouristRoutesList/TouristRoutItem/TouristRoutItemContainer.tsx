import React from 'react';
import _ from 'lodash';

import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';

import TouristRoutItem from './TouristRoutItem';

const categoryObjectVMConst = {
	id: 'sfs',
	background: 'https://coolsen.ru/wp-content/uploads/2021/12/NO-20211223_142620-6.jpg',
	icon: 'https://e7.pngegg.com/pngimages/324/887/png-clipart-computer-icons-house-graphics-home-house.png',
	label: 'счмисчмисчмичмси',
};

const TouristRoutItemContainer = ({id}: TTouristRoutItemContainerProps) => {
	// const chatTime = useStoreSelector(selectRunningChatsVideoTimeById, {chatId: chatId ?? ''});

	const touristRoutVM = categoryObjectVMConst;

	if (_.isUndefined(touristRoutVM)) {
		return null;
	}

	const onDelete = () => console.log('log');

	return <TouristRoutItem touristRoutVM={touristRoutVM} onDelete={onDelete} />;
};

type TTouristRoutItemContainerProps = {
	id: string;
};

export default TouristRoutItemContainer;
