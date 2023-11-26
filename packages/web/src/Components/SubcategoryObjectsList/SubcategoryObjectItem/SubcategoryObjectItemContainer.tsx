import React from 'react';
import _ from 'lodash';

import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';

import SubcategoryObjectItem from './SubcategoryObjectItem';
import {selectSubcategoryObjectVMById} from '@infomat/core/src/Redux/SubcategoryObject/Selectors/defaultSelectors';
import useActionDispatcher from '@infomat/core/src/Hooks/useActionDispatcher';
import {subcategoryObjectClientToServerActions} from '@infomat/core/src/Redux/SubcategoryObject/Actions/subcategoryObjectClientToServerActions';

const SubcategoryObjectItemContainer = ({id}: TSubcategoryObjectItemContainerProps) => {
	const subcategoryObjectVM = useStoreSelector(selectSubcategoryObjectVMById, id);
	const onDelete = useActionDispatcher(subcategoryObjectClientToServerActions.deleteCategory);

	if (_.isUndefined(subcategoryObjectVM)) {
		return null;
	}

	return <SubcategoryObjectItem id={id} subcategoryObjectVM={subcategoryObjectVM} onDelete={onDelete} />;
};

type TSubcategoryObjectItemContainerProps = {
	id: number;
};

export default SubcategoryObjectItemContainer;
