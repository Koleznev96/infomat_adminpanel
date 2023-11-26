import {createSlice, EntityState, SliceCaseReducers} from '@reduxjs/toolkit';
import _ from 'lodash';

import EnumStore from '@infomat/core/src/BusinessLogic/EnumStore';

import {subcategoryObjectClientOnlyActions} from './Actions/subcategoryObjectClientOnlyActions';
import {subcategoryObjectAdapter, TSubcategoryObjectCreate, TSubcategoryObjectVM} from './entityAdapter';
import {subcategoryObjectClientToServerActions} from './Actions/subcategoryObjectClientToServerActions';

const getStatusFilter = () => {
	try {
		const filter = localStorage.getItem('filter_subcategory');
		if (filter) {
			return Number(filter) > 1 || Number(filter) < 0 ? 0 : Number(filter);
		} else {
			return 0;
		}
	} catch (e) {
		return 0;
	}
};

export const initialSubcategoryObjectState = subcategoryObjectAdapter.getInitialState({
	isLoading: false,
	error: undefined,
	filter: getStatusFilter(),
	search: '',
	currentPage: 0,
	totalPages: 1,
	sizePage: 10,
});

const subcategoryObjectSlice = createSlice<
	TSubcategoryObjectSlice,
	SliceCaseReducers<TSubcategoryObjectSlice>,
	EnumStore
>({
	name: EnumStore.SUBCATEGORY_OBJECT,
	initialState: initialSubcategoryObjectState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(subcategoryObjectClientOnlyActions.resetStore, () => initialSubcategoryObjectState);
		builder.addCase(subcategoryObjectClientOnlyActions.upsertMany, (state, action) => {
			state.isLoading = false;
			state.error = undefined;
			return subcategoryObjectAdapter.setAll(state, action);
		});
		builder.addCase(subcategoryObjectClientOnlyActions.setError, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		});
		builder.addCase(subcategoryObjectClientToServerActions.getList, (state, action) => {
			state.data = undefined;
			state.isLoading = true;
			state.error = undefined;
			state.sizePage = !_.isUndefined(action.payload.size) ? action.payload.size : state.sizePage;
			state.search = !_.isUndefined(action.payload.search) ? action.payload.search : state.search;
			state.currentPage = !_.isUndefined(action.payload.page) ? action.payload.page : state.currentPage;
		});
		builder.addCase(subcategoryObjectClientToServerActions.updateCategory, (state) => {
			state.isLoading = true;
			state.error = undefined;
		});
		builder.addCase(subcategoryObjectClientToServerActions.createCategory, (state) => {
			state.isLoading = true;
			state.error = undefined;
		});
		builder.addCase(subcategoryObjectClientToServerActions.deleteCategory, (state) => {
			state.data = undefined;
			state.isLoading = true;
			state.error = undefined;
		});
		builder.addCase(subcategoryObjectClientToServerActions.get, (state) => {
			state.data = undefined;
			state.isLoading = true;
			state.error = undefined;
		});
		builder.addCase(subcategoryObjectClientOnlyActions.setData, (state, action) => {
			state.data = action.payload;
			state.isLoading = false;
			state.error = undefined;
		});
		builder.addCase(subcategoryObjectClientOnlyActions.stopLoading, (state) => {
			state.isLoading = false;
			state.error = undefined;
		});
		builder.addCase(subcategoryObjectClientOnlyActions.setTotalPages, (state, action) => {
			state.totalPages = action.payload;
		});
		builder.addCase(subcategoryObjectClientOnlyActions.setFilter, (state, action) => {
			localStorage.setItem('filter_subcategory', String(action.payload));
			state.filter = action.payload;
		});
	},
});

export type TSubcategoryObjectSlice = EntityState<TSubcategoryObjectVM> & {
	data?: TSubcategoryObjectVM;
	isLoading: boolean;
	error?: string;
	search: string;
	currentPage: number;
	totalPages: number;
	sizePage: number;
	filter: number;
};

export default subcategoryObjectSlice;
