import {createSlice, EntityState, SliceCaseReducers} from '@reduxjs/toolkit';
import _ from 'lodash';

import EnumStore from '@infomat/core/src/BusinessLogic/EnumStore';

import {specialPlaceAdapter, TSpecialPlaceCreate, TSpecialPlaceVM} from './entityAdapter';
import {specialPlacesClientOnlyActions} from './Actions/specialPlacesClientOnlyActions';
import {specialPlacesClientToServerActions} from './Actions/specialPlacesClientToServerActions';

export const initialSpecialPlacesState = specialPlaceAdapter.getInitialState({
	isLoading: false,
	error: undefined,
	search: '',
	currentPage: 0,
	totalPages: 1,
	sizePage: 10,
});

const specialPlacesSlice = createSlice<TSpecialPlaceSlice, SliceCaseReducers<TSpecialPlaceSlice>, EnumStore>({
	name: EnumStore.SPECIAL_PLACES,
	initialState: initialSpecialPlacesState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(specialPlacesClientOnlyActions.resetStore, () => initialSpecialPlacesState);
		builder.addCase(specialPlacesClientOnlyActions.upsertMany, (state, action) => {
			state.isLoading = false;
			state.error = undefined;
			return specialPlaceAdapter.setAll(state, action);
		});
		builder.addCase(specialPlacesClientOnlyActions.setError, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		});
		builder.addCase(specialPlacesClientOnlyActions.update, (state) => {
			state.data = undefined;
			state.isLoading = false;
		});
		builder.addCase(specialPlacesClientToServerActions.getList, (state, action) => {
			state.data = undefined;
			state.isLoading = true;
			state.error = undefined;
			state.sizePage = !_.isUndefined(action.payload.size) ? action.payload.size : state.sizePage;
			state.search = !_.isUndefined(action.payload.search) ? action.payload.search : state.search;
			state.currentPage = !_.isUndefined(action.payload.page) ? action.payload.page : state.currentPage;
			state.type = !_.isUndefined(action.payload.type) ? action.payload.type : state.type;
		});
		builder.addCase(specialPlacesClientToServerActions.updateCategory, (state) => {
			state.isLoading = true;
			state.error = undefined;
		});
		builder.addCase(specialPlacesClientToServerActions.createCategory, (state) => {
			state.isLoading = true;
			state.error = undefined;
		});
		builder.addCase(specialPlacesClientToServerActions.deleteCategory, (state) => {
			state.data = undefined;
			state.isLoading = true;
			state.error = undefined;
		});
		builder.addCase(specialPlacesClientToServerActions.get, (state) => {
			state.data = undefined;
			state.isLoading = true;
			state.error = undefined;
		});
		builder.addCase(specialPlacesClientOnlyActions.setData, (state, action) => {
			state.data = action.payload;
			state.isLoading = false;
			state.error = undefined;
		});
		builder.addCase(specialPlacesClientOnlyActions.stopLoading, (state) => {
			state.isLoading = false;
			state.error = undefined;
		});
		builder.addCase(specialPlacesClientOnlyActions.setTotalPages, (state, action) => {
			state.totalPages = action.payload;
		});
	},
});

export type TSpecialPlaceSlice = EntityState<TSpecialPlaceVM> & {
	data?: TSpecialPlaceCreate;
	isLoading: boolean;
	error?: string;
	search: string;
	currentPage: number;
	totalPages: number;
	sizePage: number;
	type?: string | null;
};

export default specialPlacesSlice;
