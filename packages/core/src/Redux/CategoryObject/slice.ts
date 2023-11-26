import {createSlice, EntityState, SliceCaseReducers} from '@reduxjs/toolkit';
import _ from 'lodash';

import EnumStore from '@infomat/core/src/BusinessLogic/EnumStore';

import {categoryObjectClientOnlyActions} from './Actions/categoryObjectClientOnlyActions';
import {categoryObjectAdapter, TCategoryObjectCreate, TCategoryObjectVM} from './entityAdapter';
import {categoryObjectClientToServerActions} from './Actions/categoryObjectClientToServerActions';

export const initialCategoryObjectState = categoryObjectAdapter.getInitialState({
	isLoading: false,
	error: undefined,
	search: '',
	currentPage: 0,
	totalPages: 1,
	sizePage: 10,
});

const categoryObjectSlice = createSlice<TCategoryObjectSlice, SliceCaseReducers<TCategoryObjectSlice>, EnumStore>({
	name: EnumStore.CATEGORY_OBJECT,
	initialState: initialCategoryObjectState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(categoryObjectClientOnlyActions.resetStore, () => initialCategoryObjectState);
		builder.addCase(categoryObjectClientOnlyActions.upsertMany, (state, action) => {
			state.isLoading = false;
			state.error = undefined;
			return categoryObjectAdapter.setAll(state, action);
		});
		builder.addCase(categoryObjectClientOnlyActions.setError, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		});
		builder.addCase(categoryObjectClientOnlyActions.update, (state) => {
			state.data = undefined;
			state.isLoading = false;
		});
		builder.addCase(categoryObjectClientToServerActions.getList, (state, action) => {
			state.data = undefined;
			state.isLoading = true;
			state.error = undefined;
			state.sizePage = !_.isUndefined(action.payload.size) ? action.payload.size : state.sizePage;
			state.search = !_.isUndefined(action.payload.search) ? action.payload.search : state.search;
			state.currentPage = !_.isUndefined(action.payload.page) ? action.payload.page : state.currentPage;
		});
		builder.addCase(categoryObjectClientToServerActions.updateCategory, (state) => {
			state.isLoading = true;
			state.error = undefined;
		});
		builder.addCase(categoryObjectClientToServerActions.createCategory, (state) => {
			state.isLoading = true;
			state.error = undefined;
		});
		builder.addCase(categoryObjectClientToServerActions.deleteCategory, (state) => {
			state.data = undefined;
			state.isLoading = true;
			state.error = undefined;
		});
		builder.addCase(categoryObjectClientToServerActions.get, (state) => {
			state.data = undefined;
			state.isLoading = true;
			state.error = undefined;
		});
		builder.addCase(categoryObjectClientOnlyActions.setData, (state, action) => {
			state.data = action.payload;
			state.isLoading = false;
			state.error = undefined;
		});
		builder.addCase(categoryObjectClientOnlyActions.stopLoading, (state) => {
			state.isLoading = false;
			state.error = undefined;
		});
		builder.addCase(categoryObjectClientOnlyActions.setTotalPages, (state, action) => {
			state.totalPages = action.payload;
		});
	},
});

export type TCategoryObjectSlice = EntityState<TCategoryObjectVM> & {
	data?: TCategoryObjectCreate;
	isLoading: boolean;
	error?: string;
	search: string;
	currentPage: number;
	totalPages: number;
	sizePage: number;
};

export default categoryObjectSlice;
