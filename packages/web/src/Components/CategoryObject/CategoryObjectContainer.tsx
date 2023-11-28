import React from 'react';
import {isUndefined} from 'lodash';

import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';
import {selectCategoryObjectData} from '@infomat/core/src/Redux/CategoryObject/Selectors/selectCategoryObjectData';
import {categoryObjectClientToServerActions} from '@infomat/core/src/Redux/CategoryObject/Actions/categoryObjectClientToServerActions';
import useActionDispatcher from '@infomat/core/src/Hooks/useActionDispatcher';
import {selectCategoryObjectIsLoading} from '@infomat/core/src/Redux/CategoryObject/Selectors/selectCategoryObjectIsLoading';
import Page from '@infomat/uikit/src/Page/Page';

import useRouterLinkForMui from 'src/Utils/Navigation/useRouterLinkForMui';
import {Routes} from 'src/Routes/Routes';

import CategoryObject from './CategoryObject';

const CategoryObjectContainer = ({id}: TCategoryObjectContainerProps) => {
	const categoryObjectVM = useStoreSelector(selectCategoryObjectData);
	const isLoading = useStoreSelector(selectCategoryObjectIsLoading);
	const onDelete = useActionDispatcher(categoryObjectClientToServerActions.deleteCategory);
	const onUpdate = useActionDispatcher(categoryObjectClientToServerActions.updateCategory);
	const onCreate = useActionDispatcher(categoryObjectClientToServerActions.createCategory);
	const CategoriesObjectsLink = useRouterLinkForMui(Routes.categoriesObjects);

	const dataVM = isUndefined(id) ? undefined : categoryObjectVM;

	return (
		<Page
			isLoading={isLoading || (isUndefined(dataVM) && !isUndefined(id))}
			backLink={CategoriesObjectsLink}
			label={isUndefined(id) ? 'Создание категории объектов' : 'Редактирование категории объектов'}
		>
			<CategoryObject
				id={id}
				categoryObjectVM={dataVM}
				onSubmit={isUndefined(id) ? onCreate : onUpdate}
				onDelete={onDelete}
			/>
		</Page>
	);
};

type TCategoryObjectContainerProps = {
	id?: number;
};

export default CategoryObjectContainer;
