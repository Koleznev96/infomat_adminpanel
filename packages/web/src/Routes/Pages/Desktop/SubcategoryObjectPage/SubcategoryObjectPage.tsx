import React from 'react';
import {useParams} from 'react-router';

import Page from '@infomat/uikit/src/Page/Page';

import {Routes} from 'src/Routes/Routes';
import useRouterLinkForMui from 'src/Utils/Navigation/useRouterLinkForMui';
import SubcategoryObjectContainer from 'src/Components/SubcategoryObject/SubcategoryObjectContainer';

const SubcategoryObjectPage = () => {
	const {id} = useParams() as {id: string};
	const CategoriesObjectsLink = useRouterLinkForMui(Routes.subcategoriesObjects);

	return (
		<Page backLink={CategoriesObjectsLink} label="Редактирование подкатегорию объектов">
			<SubcategoryObjectContainer id={id} />
		</Page>
	);
};

export default SubcategoryObjectPage;
