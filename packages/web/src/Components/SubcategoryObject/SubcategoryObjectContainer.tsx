import React from 'react';
import {isUndefined} from 'lodash';

import {selectSubcategoryObjectData} from '@infomat/core/src/Redux/SubcategoryObject/Selectors/selectSubcategoryObjectData';
import {selectSubcategoryObjectIsLoading} from '@infomat/core/src/Redux/SubcategoryObject/Selectors/selectSubcategoryObjectIsLoading';
import {subcategoryObjectClientToServerActions} from '@infomat/core/src/Redux/SubcategoryObject/Actions/subcategoryObjectClientToServerActions';
import useActionDispatcher from '@infomat/core/src/Hooks/useActionDispatcher';
import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';
import Page from '@infomat/uikit/src/Page/Page';

import useRouterLinkForMui from 'src/Utils/Navigation/useRouterLinkForMui';
import {Routes} from 'src/Routes/Routes';

import SubcategoryObject from './SubcategoryObject';

const SubcategoryObjectContainer = ({id}: TSubcategoryObjectContainerProps) => {
	const subcategoryObjectVM = useStoreSelector(selectSubcategoryObjectData);
	const isLoading = useStoreSelector(selectSubcategoryObjectIsLoading);
	const onDelete = useActionDispatcher(subcategoryObjectClientToServerActions.deleteCategory);
	const onUpdate = useActionDispatcher(subcategoryObjectClientToServerActions.updateCategory);
	const onCreate = useActionDispatcher(subcategoryObjectClientToServerActions.createCategory);
	const SubategoriesObjectsLink = useRouterLinkForMui(Routes.subcategoriesObjects);

	const dataVM = isUndefined(id) ? undefined : subcategoryObjectVM;

	return (
		<Page
			isLoading={isLoading || (isUndefined(dataVM) && !isUndefined(id))}
			backLink={SubategoriesObjectsLink}
			label={isUndefined(id) ? 'Создание категории объектов' : 'Редактирование категории объектов'}
		>
			<SubcategoryObject
				id={id}
				subcategoryObjectVM={dataVM}
				onSubmit={isUndefined(id) ? onCreate : onUpdate}
				onDelete={onDelete}
			/>
		</Page>
	);
};

type TSubcategoryObjectContainerProps = {
	id?: number;
};

export default SubcategoryObjectContainer;
