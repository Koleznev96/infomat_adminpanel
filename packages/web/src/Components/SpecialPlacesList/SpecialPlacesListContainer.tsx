import React from 'react';
import _ from 'lodash';

import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';
import {selectSpecialPlacesIds} from '@infomat/core/src/Redux/SpecialPlace/Selectors/defaultSelectors';
import {selectSpecialPlacesCurrentPage} from '@infomat/core/src/Redux/SpecialPlace/Selectors/selectSpecialPlacesCurrentPage';
import {selectSpecialPlacesIsLoading} from '@infomat/core/src/Redux/SpecialPlace/Selectors/selectSpecialPlacesIsLoading';
import {selectSpecialPlacesSearch} from '@infomat/core/src/Redux/SpecialPlace/Selectors/selectSpecialPlacesSearch';
import {selectSpecialPlacesSizePage} from '@infomat/core/src/Redux/SpecialPlace/Selectors/selectSpecialPlacesSizePage';
import {selectSpecialPlacesTotalPages} from '@infomat/core/src/Redux/SpecialPlace/Selectors/selectSpecialPlacesTotalPages';
import {selectErrorSpecialPlaces} from '@infomat/core/src/Redux/SpecialPlace/Selectors/selectErrorSpecialPlaces';
import {specialPlacesClientToServerActions} from '@infomat/core/src/Redux/SpecialPlace/Actions/specialPlacesClientToServerActions';
import {selectSpecialPlacesType} from '@infomat/core/src/Redux/SpecialPlace/Selectors/selectSpecialPlacesType';

import SpecialPlacesList from './SpecialPlacesList';
import useActionDispatcher from '@infomat/core/src/Hooks/useActionDispatcher';

const SpecialPlacesListContainer = () => {
	const error = useStoreSelector(selectErrorSpecialPlaces);
	const totalPage = useStoreSelector(selectSpecialPlacesTotalPages);
	const size = useStoreSelector(selectSpecialPlacesSizePage);
	const search = useStoreSelector(selectSpecialPlacesSearch);
	const isLoading = useStoreSelector(selectSpecialPlacesIsLoading);
	const currentPage = useStoreSelector(selectSpecialPlacesCurrentPage);
	const specialPlaceIds = useStoreSelector(selectSpecialPlacesIds);
	const getData = useActionDispatcher(specialPlacesClientToServerActions.getList);
	const type = useStoreSelector(selectSpecialPlacesType);

	return (
		<SpecialPlacesList
			specialPlaceIds={specialPlaceIds}
			currentPage={currentPage}
			isLoading={isLoading}
			search={search}
			size={size}
			totalPage={totalPage}
			error={error}
			getData={getData}
			type={type}
		/>
	);
};

export default SpecialPlacesListContainer;
