import React from 'react';

import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';
import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import RoutesOnMap from './RoutesOnMap';
import useActionDispatcher from '@infomat/core/src/Hooks/useActionDispatcher';
import {selectPlacesIsLoading} from '@infomat/core/src/Redux/Places/Selectors/selectPlacesIsLoading';
import {selectPlacesList} from '@infomat/core/src/Redux/Places/Selectors/selectPlacesList';
import {placesClientToServerActions} from '@infomat/core/src/Redux/Places/Actions/placesClientToServerActions';
import {TStop} from '@infomat/core/src/Redux/Routes/entityAdapter';
import {placesClientOnlyActions} from '@infomat/core/src/Redux/Places/Actions/placesClientOnlyActions';

const ItemRoutesMapContainer = ({label, labelMap, setValue, value, routeColor}: TItemRoutesMapContainerProps) => {
	const isLoading = useStoreSelector(selectPlacesIsLoading);
	const placesList = useStoreSelector(selectPlacesList);
	const getSearch = useActionDispatcher(placesClientToServerActions.getSearch);
	const onReset = useActionDispatcher(placesClientOnlyActions.resetStore);

	return (
		<RoutesOnMap
			placesIds={placesList}
			isLoading={isLoading}
			getSearch={getSearch}
			labelMap={labelMap}
			label={label}
			value={value}
			setValue={setValue}
			routeColor={routeColor}
			onReset={onReset}
		/>
	);
};

type TItemRoutesMapContainerProps = {
	label?: string;
	labelMap?: string;
	setValue: PropertyHandler<TStop[]>;
	value?: TStop[];
	routeColor?: string;
};

export default ItemRoutesMapContainer;
