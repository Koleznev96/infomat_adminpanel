import React from 'react';
import {useParams} from 'react-router';

import Page from '@infomat/uikit/src/Page/Page';

import {Routes} from 'src/Routes/Routes';
import useRouterLinkForMui from 'src/Utils/Navigation/useRouterLinkForMui';
import TouristObjectContainer from 'src/Components/TouristObject/TouristObjectContainer';

const TouristObjectPage = () => {
	const {id} = useParams() as {id: string};
	const TouristObjectsLink = useRouterLinkForMui(Routes.touristObjects);

	return (
		<Page backLink={TouristObjectsLink} label="Редактирование объекта">
			<TouristObjectContainer id={id} />
		</Page>
	);
};

export default TouristObjectPage;
