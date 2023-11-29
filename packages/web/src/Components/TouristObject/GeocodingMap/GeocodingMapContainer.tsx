import React from 'react';

import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';
import {selectAddress} from '@infomat/core/src/Redux/Geocoding/Selectors/selectAddress';
import {selectCoordinates} from '@infomat/core/src/Redux/Geocoding/Selectors/selectCoordinates';
import {selectGeocodingIsLoading} from '@infomat/core/src/Redux/Geocoding/Selectors/selectGeocodingIsLoading';
import AddressWithMapField from '@infomat/uikit/src/Fields/AddressWithMapField/AddressWithMapField';
import {TAddress} from '@infomat/core/src/Redux/Geocoding/entityAdapter';
import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import useActionDispatcher from '@infomat/core/src/Hooks/useActionDispatcher';
import {geocodingClientToServerActions} from '@infomat/core/src/Redux/Geocoding/Actions/geocodingClientToServerActions';
import geocodingClientOnlyActions from '@infomat/core/src/Redux/Geocoding/Actions/geocodingClientOnlyActions';
import {selectGeocodingErrors} from '@infomat/core/src/Redux/Geocoding/Selectors/selectGeocodingErrors';
import {selectCoordinatesDragend} from '@infomat/core/src/Redux/Geocoding/Selectors/selectCoordinatesDragend';

const GeocodingMapContainer = ({label, placeholder, value, setValue}: TGeocodingMapContainerProps) => {
	const addressForSearch = useStoreSelector(selectAddress);
	const addressForPoint = useStoreSelector(selectCoordinates);
	const addressForPointDragend = useStoreSelector(selectCoordinatesDragend);
	const {errorAddress, errorCoordinates} = useStoreSelector(selectGeocodingErrors);
	const {isLoadingAddress, isLoadingCoordinates} = useStoreSelector(selectGeocodingIsLoading);
	const onSearchByAddress = useActionDispatcher(geocodingClientToServerActions.getGeocoding);
	const onSearchByGeocodingDragend = useActionDispatcher(geocodingClientToServerActions.getAddressDragend);
	const onSearchByGeocoding = useActionDispatcher(geocodingClientToServerActions.getAddress);
	const onReset = useActionDispatcher(geocodingClientOnlyActions.reset);

	return (
		<AddressWithMapField
			errorAddress={errorAddress}
			errorCoordinates={errorCoordinates}
			value={value}
			setValue={setValue}
			label={label}
			placeholder={placeholder}
			addressForSearch={addressForSearch}
			addressForPoint={addressForPoint}
			isLoadingAddress={isLoadingAddress}
			isLoadingCoordinates={isLoadingCoordinates}
			onSearchByAddress={onSearchByAddress}
			onSearchByGeocoding={onSearchByGeocoding}
			onSearchByGeocodingDragend={onSearchByGeocodingDragend}
			onReset={onReset}
			addressForPointDragend={addressForPointDragend}
		/>
	);
};

type TGeocodingMapContainerProps = {
	label?: string;
	placeholder?: string;
	value?: TAddress;
	setValue: PropertyHandler<TAddress>;
};

export default GeocodingMapContainer;
