import React from 'react';
import _ from 'lodash';

import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';
import useActionDispatcher from '@infomat/core/src/Hooks/useActionDispatcher';
import {selectRoutesTotalPages} from '@infomat/core/src/Redux/Routes/Selectors/selectRoutesTotalPages';
import {selectRoutesSizePage} from '@infomat/core/src/Redux/Routes/Selectors/selectRoutesSizePage';
import {selectRoutesSearch} from '@infomat/core/src/Redux/Routes/Selectors/selectRoutesSearch';
import {selectRoutesIsLoading} from '@infomat/core/src/Redux/Routes/Selectors/selectRoutesIsLoading';
import {selectRoutesCurrentPage} from '@infomat/core/src/Redux/Routes/Selectors/selectRoutesCurrentPage';
import {selectRoutesIds} from '@infomat/core/src/Redux/Routes/Selectors/defaultSelectors';
import {routesClientToServerActions} from '@infomat/core/src/Redux/Routes/Actions/routesClientToServerActions';
import {selectRoutesStatus} from '@infomat/core/src/Redux/Routes/Selectors/selectRoutesStatus';

import TouristRoutesList from './TouristRoutesList';

const TouristRoutesListContainer = () => {
	const totalPage = useStoreSelector(selectRoutesTotalPages);
	const size = useStoreSelector(selectRoutesSizePage);
	const search = useStoreSelector(selectRoutesSearch);
	const isLoading = useStoreSelector(selectRoutesIsLoading);
	const currentPage = useStoreSelector(selectRoutesCurrentPage);
	const status = useStoreSelector(selectRoutesStatus);
	const routesIds = useStoreSelector(selectRoutesIds);
	const getData = useActionDispatcher(routesClientToServerActions.getList);

	return (
		<TouristRoutesList
			routesIds={routesIds}
			currentPage={currentPage}
			isLoading={isLoading}
			search={search}
			size={size}
			totalPage={totalPage}
			getData={getData}
			status={status}
		/>
	);
};

export default TouristRoutesListContainer;
