import {createSlice, EntityState, SliceCaseReducers} from '@reduxjs/toolkit';
import _ from 'lodash';

import EnumStore from '@infomat/core/src/BusinessLogic/EnumStore';

import {routesAdapter, TRoutesCreate, TRoutesVM} from './entityAdapter';
import {routesClientOnlyActions} from './Actions/routesClientOnlyActions';
import {routesClientToServerActions} from './Actions/routesClientToServerActions';

export const initialRoutesState = routesAdapter.getInitialState({
	isLoading: false,
	error: undefined,
	search: '',
	currentPage: 0,
	totalPages: 1,
	sizePage: 10,
});

const routesSlice = createSlice<TRoutesSlice, SliceCaseReducers<TRoutesSlice>, EnumStore>({
	name: EnumStore.ROUTES,
	initialState: initialRoutesState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(routesClientOnlyActions.resetStore, () => initialRoutesState);
		builder.addCase(routesClientOnlyActions.upsertMany, (state, action) => {
			state.isLoading = false;
			state.error = undefined;
			return routesAdapter.setAll(state, action);
		});
		builder.addCase(routesClientOnlyActions.setError, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		});
		builder.addCase(routesClientOnlyActions.update, (state) => {
			state.data = undefined;
			state.isLoading = false;
		});
		builder.addCase(routesClientToServerActions.getList, (state, action) => {
			state.data = undefined;
			state.isLoading = true;
			state.error = undefined;
			state.sizePage = !_.isUndefined(action.payload.size) ? action.payload.size : state.sizePage;
			state.search = !_.isUndefined(action.payload.search) ? action.payload.search : state.search;
			state.currentPage = !_.isUndefined(action.payload.page) ? action.payload.page : state.currentPage;
			state.status = !_.isUndefined(action.payload.status) ? action.payload.status : state.status;
		});
		builder.addCase(routesClientToServerActions.updateCategory, (state) => {
			state.isLoading = true;
			state.error = undefined;
		});
		builder.addCase(routesClientToServerActions.createCategory, (state) => {
			state.isLoading = true;
			state.error = undefined;
		});
		builder.addCase(routesClientToServerActions.deleteCategory, (state) => {
			state.data = undefined;
			state.isLoading = true;
			state.error = undefined;
		});
		builder.addCase(routesClientToServerActions.deleteRecommend, (state) => {
			state.data = undefined;
			state.isLoading = true;
			state.error = undefined;
		});
		builder.addCase(routesClientToServerActions.get, (state) => {
			state.data = undefined;
			state.isLoading = true;
			state.error = undefined;
		});
		builder.addCase(routesClientOnlyActions.setData, (state, action) => {
			state.data = action.payload;
			state.isLoading = false;
			state.error = undefined;
		});
		builder.addCase(routesClientOnlyActions.stopLoading, (state) => {
			state.isLoading = false;
			state.error = undefined;
		});
		builder.addCase(routesClientOnlyActions.setTotalPages, (state, action) => {
			state.totalPages = action.payload;
		});
	},
});

export type TRoutesSlice = EntityState<TRoutesVM> & {
	data?: TRoutesCreate;
	isLoading: boolean;
	error?: string;
	search: string;
	currentPage: number;
	totalPages: number;
	sizePage: number;
	status?: string | null;
};

export default routesSlice;
