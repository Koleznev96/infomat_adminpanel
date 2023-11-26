import {createSlice, EntityState, SliceCaseReducers} from '@reduxjs/toolkit';
import _ from 'lodash';

import EnumStore from '@infomat/core/src/BusinessLogic/EnumStore';

import {eventsAdapter, TEventsVM, TEventsCreate} from './entityAdapter';
import {eventsClientOnlyActions} from './Actions/eventsClientOnlyActions';
import {eventsClientToServerActions} from './Actions/eventsClientToServerActions';

export const eventsPlacesState = eventsAdapter.getInitialState({
	isLoading: false,
	error: undefined,
	search: '',
	currentPage: 0,
	totalPages: 1,
	sizePage: 10,
});

const eventsSlice = createSlice<TEventsSlice, SliceCaseReducers<TEventsSlice>, EnumStore>({
	name: EnumStore.CATEGORY_OBJECT,
	initialState: eventsPlacesState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(eventsClientOnlyActions.resetStore, () => eventsPlacesState);
		builder.addCase(eventsClientOnlyActions.upsertMany, (state, action) => {
			state.isLoading = false;
			state.error = undefined;
			return eventsAdapter.setAll(state, action);
		});
		builder.addCase(eventsClientOnlyActions.setError, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		});
		builder.addCase(eventsClientOnlyActions.update, (state) => {
			state.data = undefined;
			state.isLoading = false;
		});
		builder.addCase(eventsClientToServerActions.getList, (state, action) => {
			state.data = undefined;
			state.isLoading = true;
			state.error = undefined;
			state.sizePage = !_.isUndefined(action.payload.size) ? action.payload.size : state.sizePage;
			state.search = !_.isUndefined(action.payload.search) ? action.payload.search : state.search;
			state.currentPage = !_.isUndefined(action.payload.page) ? action.payload.page : state.currentPage;
			state.status = !_.isUndefined(action.payload.status) ? action.payload.status : state.status;
			state.startDate = !_.isUndefined(action.payload.startDate) ? action.payload.startDate : state.startDate;
		});
		builder.addCase(eventsClientToServerActions.updateCategory, (state) => {
			state.isLoading = true;
			state.error = undefined;
		});
		builder.addCase(eventsClientToServerActions.createCategory, (state) => {
			state.isLoading = true;
			state.error = undefined;
		});
		builder.addCase(eventsClientToServerActions.deleteCategory, (state) => {
			state.data = undefined;
			state.isLoading = true;
			state.error = undefined;
		});
		builder.addCase(eventsClientToServerActions.deleteRecommend, (state) => {
			state.data = undefined;
			state.isLoading = true;
			state.error = undefined;
		});
		builder.addCase(eventsClientToServerActions.get, (state) => {
			state.data = undefined;
			state.isLoading = true;
			state.error = undefined;
		});
		builder.addCase(eventsClientOnlyActions.setData, (state, action) => {
			state.data = action.payload;
			state.isLoading = false;
			state.error = undefined;
		});
		builder.addCase(eventsClientOnlyActions.stopLoading, (state) => {
			state.isLoading = false;
			state.error = undefined;
		});
		builder.addCase(eventsClientOnlyActions.setTotalPages, (state, action) => {
			state.totalPages = action.payload;
		});
	},
});

export type TEventsSlice = EntityState<TEventsVM> & {
	data?: TEventsCreate;
	isLoading: boolean;
	error?: string;
	search: string;
	currentPage: number;
	totalPages: number;
	sizePage: number;
	status?: string | null;
	startDate?: boolean | null;
};

export default eventsSlice;
