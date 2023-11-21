import _ from 'lodash';
import {combineReducers} from 'redux';
import {enableBatching} from 'redux-batched-actions';
import {createAction, Reducer} from '@reduxjs/toolkit';
import {PayloadAction} from '@reduxjs/toolkit/src/createAction';

import EnumStore from '@infomat/core/src/BusinessLogic/EnumStore';
import geocodingSlice from '@infomat/core/src/Redux/Geocoding/slice';

const reducers = {
	[EnumStore.GEOCODING]: geocodingSlice.reducer,
};

export const resetAllStores = createAction<{keepLocalStores: boolean} | undefined>('app/reset_all_stores');

const combinedReducers = combineReducers(reducers);

const rootReducer: Reducer<ReturnType<typeof combinedReducers>> = (state, action) => {
	const newState = combinedReducers(action.type === resetAllStores.type ? undefined : state, action);

	// if (action.type === resetAllStores.type && !_.isUndefined(state)) {
	// 	newState[EnumStore.CURRENCY] = state[EnumStore.CURRENCY];
	// 	newState[EnumStore.CLIENT] = state[EnumStore.CLIENT];
	// 	const resetStoreAction = action as PayloadAction<{keepLocalStores: boolean} | undefined>;

	// 	if (resetStoreAction.payload?.keepLocalStores) {
	// 		newState[EnumStore.CHANNELS] = {
	// 			...initialState,
	// 			..._.pick(state[EnumStore.CHANNELS], 'filter', 'targetIds', 'targetGroupIds', 'isTargetsSelectEnabled'),
	// 		};
	// 		newState[EnumStore.ATTACHMENT] = state[EnumStore.ATTACHMENT];
	// 		newState[EnumStore.CHANNEL_INPUT_TEXT] = state[EnumStore.CHANNEL_INPUT_TEXT];
	// 		newState[EnumStore.CHANNEL_ATTACHMENTS] = state[EnumStore.CHANNEL_ATTACHMENTS];
	// 	}
	// }

	return newState;
};

export default enableBatching(rootReducer);
