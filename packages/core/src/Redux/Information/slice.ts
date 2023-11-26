import {createSlice, SliceCaseReducers} from '@reduxjs/toolkit';

import EnumStore from '@infomat/core/src/BusinessLogic/EnumStore';

import {TInformationVM} from './type';
import {informationClientOnlyActions} from './Actions/informationClientOnlyActions';
import {informationClientToServerActions} from './Actions/informationClientToServerActions';

export const initialInformationState = {
	data: undefined,
	isLoading: false,
	error: undefined,
};

const informationSlice = createSlice<TInformationSlice, SliceCaseReducers<TInformationSlice>, EnumStore>({
	name: EnumStore.INFORMATION,
	initialState: initialInformationState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(informationClientOnlyActions.resetStore, () => initialInformationState);
		builder.addCase(informationClientToServerActions.getDeatails, (state) => {
			state.error = undefined;
			state.isLoading = true;
		});
		builder.addCase(informationClientOnlyActions.stopLoading, (state) => {
			state.error = undefined;
			state.isLoading = false;
		});
		builder.addCase(informationClientToServerActions.updateDetails, (state) => {
			state.error = undefined;
			state.isLoading = true;
		});
		builder.addCase(informationClientOnlyActions.upsetDetailes, (state, action) => {
			state.data = {...action.payload};
			state.isLoading = false;
		});
	},
});

export type TInformationSlice = {
	data?: TInformationVM;
	isLoading: boolean;
	error?: string;
};

export default informationSlice;
