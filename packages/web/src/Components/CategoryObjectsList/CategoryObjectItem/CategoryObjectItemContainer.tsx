import React from 'react';
import _ from 'lodash';

import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';

import CategoryObjectItem from './CategoryObjectItem';
import useActionDispatcher from '@infomat/core/src/Hooks/useActionDispatcher';
import {categoryObjectClientToServerActions} from '@infomat/core/src/Redux/CategoryObject/Actions/categoryObjectClientToServerActions';
import {selectCategoryObjectVMById} from '@infomat/core/src/Redux/CategoryObject/Selectors/defaultSelectors';

const CategoryObjectItemContainer = ({id}: TCategoryObjectItemContainerProps) => {
	const categoryObjectVM = useStoreSelector(selectCategoryObjectVMById, id);
	const onDelete = useActionDispatcher(categoryObjectClientToServerActions.deleteCategory);

	if (_.isUndefined(categoryObjectVM)) {
		return null;
	}

	return <CategoryObjectItem id={id} categoryObjectVM={categoryObjectVM} onDelete={onDelete} />;
};

type TCategoryObjectItemContainerProps = {
	id: number;
};

export default CategoryObjectItemContainer;
