import React from 'react';
import {useParams} from 'react-router';

import Page from '@infomat/uikit/src/Page/Page';

import {Routes} from 'src/Routes/Routes';
import useRouterLinkForMui from 'src/Utils/Navigation/useRouterLinkForMui';
import TouristRoutContainer from 'src/Components/TouristRout/TouristRoutContainer';

const TouristRoutPage = () => {
	const {id} = useParams() as {id: string};
	const TouristObjectsLink = useRouterLinkForMui(Routes.touristRoutes);

	return (
		<Page backLink={TouristObjectsLink} label="Редактирование маршрута">
			<TouristRoutContainer id={id} />
		</Page>
	);
};

export default TouristRoutPage;
