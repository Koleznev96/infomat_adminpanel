import React from 'react';
import _ from 'lodash';

import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';

import SpecialPlaceItem from './SpecialPlaceItem';
import useActionDispatcher from '@infomat/core/src/Hooks/useActionDispatcher';
import {selectSpecialPlacesVMById} from '@infomat/core/src/Redux/SpecialPlace/Selectors/defaultSelectors';
import {specialPlacesClientToServerActions} from '@infomat/core/src/Redux/SpecialPlace/Actions/specialPlacesClientToServerActions';

const SpecialPlaceItemContainer = ({id}: TSpecialPlaceItemContainerProps) => {
	const specialPlaceVM = useStoreSelector(selectSpecialPlacesVMById, id);
	const onDelete = useActionDispatcher(specialPlacesClientToServerActions.deleteCategory);

	if (_.isUndefined(specialPlaceVM)) {
		return null;
	}

	return <SpecialPlaceItem id={id} specialPlaceVM={specialPlaceVM} onDelete={onDelete} />;
};

type TSpecialPlaceItemContainerProps = {
	id: number;
};

export default SpecialPlaceItemContainer;
