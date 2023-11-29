import {createSlice, EntityState, SliceCaseReducers} from '@reduxjs/toolkit';
import _ from 'lodash';

import EnumStore from '@infomat/core/src/BusinessLogic/EnumStore';

import {placesAdapter, TPlacesCreate, TPlacesVM} from './entityAdapter';
import {placesClientOnlyActions} from './Actions/placesClientOnlyActions';
import {placesClientToServerActions} from './Actions/placesClientToServerActions';

export const initialPlacesState = placesAdapter.getInitialState({
	isLoading: false,
	error: undefined,
	search: '',
	currentPage: 0,
	totalPages: 1,
	sizePage: 10,
	list: [],
});

const placesSlice = createSlice<TPlacesSlice, SliceCaseReducers<TPlacesSlice>, EnumStore>({
	name: EnumStore.PLACES,
	initialState: initialPlacesState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(placesClientOnlyActions.resetStore, () => initialPlacesState);
		builder.addCase(placesClientOnlyActions.upsertMany, (state, action) => {
			state.isLoading = false;
			state.error = undefined;
			return placesAdapter.setAll(state, action);
		});
		builder.addCase(placesClientOnlyActions.setError, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		});
		builder.addCase(placesClientOnlyActions.update, (state) => {
			state.data = undefined;
			state.isLoading = false;
		});
		builder.addCase(placesClientToServerActions.getList, (state, action) => {
			state.data = undefined;
			state.isLoading = true;
			state.error = undefined;
			state.sizePage = !_.isUndefined(action.payload.size) ? action.payload.size : state.sizePage;
			state.search = !_.isUndefined(action.payload.search) ? action.payload.search : state.search;
			state.subcategoryId = !_.isUndefined(action.payload.subcategoryId)
				? action.payload.subcategoryId
				: state.subcategoryId;
			state.currentPage = !_.isUndefined(action.payload.page) ? action.payload.page : state.currentPage;
			state.status = !_.isUndefined(action.payload.status) ? action.payload.status : state.status;
			state.recommendedOnly = !_.isUndefined(action.payload.recommendedOnly)
				? action.payload.recommendedOnly
				: state.recommendedOnly;
		});
		builder.addCase(placesClientToServerActions.updateCategory, (state) => {
			state.isLoading = true;
			state.error = undefined;
		});
		builder.addCase(placesClientToServerActions.createCategory, (state) => {
			state.isLoading = true;
			state.error = undefined;
		});
		builder.addCase(placesClientToServerActions.deleteCategory, (state) => {
			state.data = undefined;
			state.isLoading = true;
			state.error = undefined;
		});
		builder.addCase(placesClientToServerActions.deleteRecommend, (state) => {
			state.data = undefined;
			state.isLoading = true;
			state.error = undefined;
		});
		builder.addCase(placesClientToServerActions.get, (state) => {
			state.data = undefined;
			state.isLoading = true;
			state.error = undefined;
		});
		builder.addCase(placesClientOnlyActions.setData, (state, action) => {
			state.data = action.payload;
			state.isLoading = false;
			state.error = undefined;
		});
		builder.addCase(placesClientOnlyActions.stopLoading, (state) => {
			state.isLoading = false;
			state.error = undefined;
		});
		builder.addCase(placesClientOnlyActions.setTotalPages, (state, action) => {
			state.totalPages = action.payload;
		});
		builder.addCase(placesClientToServerActions.getSearch, (state, action) => {
			state.data = undefined;
			state.isLoading = true;
			state.error = undefined;
			return placesAdapter.removeAll(state);
		});
		builder.addCase(placesClientOnlyActions.setList, (state, action) => {
			state.isLoading = false;
			state.error = undefined;
			state.list = action.payload;
		});
	},
});

export type TPlacesSlice = EntityState<TPlacesVM> & {
	data?: TPlacesCreate;
	isLoading: boolean;
	error?: string;
	search: string;
	subcategoryId?: number | null;
	currentPage: number;
	totalPages: number;
	sizePage: number;
	status?: string | null;
	recommendedOnly?: boolean | null;
	list: TPlacesVM[];
};

export default placesSlice;
