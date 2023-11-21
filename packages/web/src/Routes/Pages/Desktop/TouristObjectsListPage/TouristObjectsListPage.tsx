import React from 'react';
import {useParams} from 'react-router';

import {Routes} from 'src/Routes/Routes';
import useRouterLinkForMui from 'src/Utils/Navigation/useRouterLinkForMui';
import TouristObjectsListContainer from 'src/Components/TouristObjectsList/TouristObjectsListContainer';

const TouristObjectsListPage = () => {
	const {id} = useParams() as {id: string};
	const TouristObjectsLink = useRouterLinkForMui(Routes.touristObjects);

	return <TouristObjectsListContainer id={id} />;

	// <PageListIteration>
};

export default TouristObjectsListPage;
