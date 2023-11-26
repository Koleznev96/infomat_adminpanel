import React from 'react';
import _ from 'lodash';

import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';
import {selectPlacesVMById} from '@infomat/core/src/Redux/Places/Selectors/defaultSelectors';
import useActionDispatcher from '@infomat/core/src/Hooks/useActionDispatcher';
import {placesClientToServerActions} from '@infomat/core/src/Redux/Places/Actions/placesClientToServerActions';

import TouristObjectItem from './TouristObjectItem';

const TouristObjectItemContainer = ({id, isRemoveRecommend}: TTouristObjectItemContainerProps) => {
	const touristObjectVM = useStoreSelector(selectPlacesVMById, id);
	const onDelete = useActionDispatcher(placesClientToServerActions.deleteCategory);
	const onDeleteRecommend = useActionDispatcher(placesClientToServerActions.deleteRecommend);

	if (_.isUndefined(touristObjectVM)) {
		return null;
	}

	return (
		<TouristObjectItem
			id={id}
			isRemoveRecommend={isRemoveRecommend}
			touristObjectVM={touristObjectVM}
			onDelete={onDelete}
			onDeleteRecommend={onDeleteRecommend}
		/>
	);
};

type TTouristObjectItemContainerProps = {
	id: number;
	isRemoveRecommend?: boolean;
};

export default TouristObjectItemContainer;
