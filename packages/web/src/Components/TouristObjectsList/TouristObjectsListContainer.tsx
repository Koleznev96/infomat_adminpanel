import React from 'react';

import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';
import useActionDispatcher from '@infomat/core/src/Hooks/useActionDispatcher';
import {selectErrorPlaces} from '@infomat/core/src/Redux/Places/Selectors/selectErrorPlaces';
import {selectPlacesTotalPages} from '@infomat/core/src/Redux/Places/Selectors/selectPlacesTotalPages';
import {selectPlacesSizePage} from '@infomat/core/src/Redux/Places/Selectors/selectPlacesSizePage';
import {selectPlacesSearch} from '@infomat/core/src/Redux/Places/Selectors/selectPlacesSearch';
import {selectPlacesIsLoading} from '@infomat/core/src/Redux/Places/Selectors/selectPlacesIsLoading';
import {selectPlacesCurrentPage} from '@infomat/core/src/Redux/Places/Selectors/selectPlacesCurrentPage';
import {selectPlacesIds} from '@infomat/core/src/Redux/Places/Selectors/defaultSelectors';
import {placesClientToServerActions} from '@infomat/core/src/Redux/Places/Actions/placesClientToServerActions';
import {selectPlacesRecommendedOnly} from '@infomat/core/src/Redux/Places/Selectors/selectPlacesRecommendedOnly';
import {selectPlacesSubcategoryId} from '@infomat/core/src/Redux/Places/Selectors/selectPlacesSubcategoryId';
import {selectPlacesStatus} from '@infomat/core/src/Redux/Places/Selectors/selectPlacesStatus';

import TouristObjectsList from './TouristObjectsList';

const TouristObjectsListContainer = ({isRemoveRecommend}: TTouristObjectsListContainerProps) => {
	const error = useStoreSelector(selectErrorPlaces);
	const totalPage = useStoreSelector(selectPlacesTotalPages);
	const size = useStoreSelector(selectPlacesSizePage);
	const search = useStoreSelector(selectPlacesSearch);
	const subcategoryId = useStoreSelector(selectPlacesSubcategoryId);
	const isLoading = useStoreSelector(selectPlacesIsLoading);
	const currentPage = useStoreSelector(selectPlacesCurrentPage);
	const status = useStoreSelector(selectPlacesStatus);
	const recommendedOnly = useStoreSelector(selectPlacesRecommendedOnly);
	const placesIds = useStoreSelector(selectPlacesIds);
	const getData = useActionDispatcher(placesClientToServerActions.getList);

	return (
		<TouristObjectsList
			placesIds={placesIds}
			currentPage={currentPage}
			isLoading={isLoading}
			search={search}
			size={size}
			totalPage={totalPage}
			error={error}
			getData={getData}
			status={status}
			recommendedOnly={recommendedOnly}
			isRemoveRecommend={isRemoveRecommend}
			subcategoryId={subcategoryId}
		/>
	);
};

type TTouristObjectsListContainerProps = {
	isRemoveRecommend?: boolean;
};

export default TouristObjectsListContainer;
