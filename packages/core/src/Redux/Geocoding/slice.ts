import {createSlice, SliceCaseReducers} from '@reduxjs/toolkit';

import EnumStore from '@infomat/core/src/BusinessLogic/EnumStore';
import {TAddress} from '@infomat/core/src/Redux/Geocoding/entityAdapter';
import geocodingClientOnlyActions from '@infomat/core/src/Redux/Geocoding/Actions/geocodingClientOnlyActions';
import {geocodingClientToServerActions} from '@infomat/core/src/Redux/Geocoding/Actions/geocodingClientToServerActions';

export const initialGeocodingState = {
	isLoadingAddress: false,
	isLoadingCoordinates: false,
	address: [],
	coordinates: undefined,
};

const geocodingSlice = createSlice<TGeocodingSlice, SliceCaseReducers<TGeocodingSlice>, EnumStore>({
	name: EnumStore.GEOCODING,
	initialState: initialGeocodingState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(geocodingClientOnlyActions.resetStore, () => initialGeocodingState);
		builder.addCase(geocodingClientOnlyActions.upsertAddress, (state, action) => {
			// 1.2
			state.address = action.payload;
			state.isLoadingCoordinates = false;
		});
		builder.addCase(geocodingClientOnlyActions.upsertCoordinates, (state, action) => {
			// 2.2
			state.coordinates = action.payload;
			state.isLoadingAddress = false;
		});
		builder.addCase(geocodingClientOnlyActions.setErrors, (state, action) => {
			state.isLoadingCoordinates = false;
			state.isLoadingAddress = false;
			state.errorAddress = action.payload.errorAddress;
			state.errorCoordinates = action.payload.errorCoordinates;
		});
		builder.addCase(geocodingClientToServerActions.getAddress, (state, action) => {
			// 2.1
			state.isLoadingAddress = true;
		});
		builder.addCase(geocodingClientToServerActions.getGeocoding, (state, action) => {
			// 1.1
			state.isLoadingCoordinates = true;
		});
	},
});

export type TGeocodingSlice = {
	isLoadingAddress: boolean;
	isLoadingCoordinates: boolean;
	errorAddress?: string;
	errorCoordinates?: string;
	address: TAddress[];
	coordinates?: string;
};

export default geocodingSlice;
