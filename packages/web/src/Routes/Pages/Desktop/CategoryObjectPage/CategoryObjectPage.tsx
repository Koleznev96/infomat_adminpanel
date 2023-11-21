import React from 'react';
import {useParams} from 'react-router';

import Page from '@infomat/uikit/src/Page/Page';

import {Routes} from 'src/Routes/Routes';
import useRouterLinkForMui from 'src/Utils/Navigation/useRouterLinkForMui';
import CategoryObjectContainer from 'src/Components/CategoryObject/CategoryObjectContainer';

const CategoryObjectPage = () => {
	const {id} = useParams() as {id: string};
	const CategoriesObjectsLink = useRouterLinkForMui(Routes.categoriesObjects);

	return (
		<Page backLink={CategoriesObjectsLink} label="Редактирование категории объектов">
			<CategoryObjectContainer id={id} />
		</Page>
	);
};

export default CategoryObjectPage;
