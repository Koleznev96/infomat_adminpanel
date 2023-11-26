import React from 'react';
import _ from 'lodash';

import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';
import {selectRoutesVMById} from '@infomat/core/src/Redux/Routes/Selectors/defaultSelectors';
import useActionDispatcher from '@infomat/core/src/Hooks/useActionDispatcher';
import {routesClientToServerActions} from '@infomat/core/src/Redux/Routes/Actions/routesClientToServerActions';

import TouristRoutItem from './TouristRoutItem';

const TouristRoutItemContainer = ({id}: TTouristRoutItemContainerProps) => {
	const touristRoutVM = useStoreSelector(selectRoutesVMById, id);
	const onDelete = useActionDispatcher(routesClientToServerActions.deleteCategory);

	if (_.isUndefined(touristRoutVM)) {
		return null;
	}

	return <TouristRoutItem id={id} touristRoutVM={touristRoutVM} onDelete={onDelete} />;
};

type TTouristRoutItemContainerProps = {
	id: number;
};

export default TouristRoutItemContainer;
