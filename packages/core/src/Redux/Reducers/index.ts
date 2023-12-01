import _ from 'lodash';
import {combineReducers} from 'redux';
import {enableBatching} from 'redux-batched-actions';
import {createAction, Reducer} from '@reduxjs/toolkit';

import EnumStore from '@infomat/core/src/BusinessLogic/EnumStore';
import geocodingSlice from '@infomat/core/src/Redux/Geocoding/slice';
import userSlice from '@infomat/core/src/Redux/User/slice';
import informationSlice from '@infomat/core/src/Redux/Information/slice';
import categoryObjectSlice from '@infomat/core/src/Redux/CategoryObject/slice';
import notificationsSlice from '@infomat/core/src/Redux/Notifications/slice';
import subcategoryObjectSlice from '@infomat/core/src/Redux/SubcategoryObject/slice';
import placesSlice from '@infomat/core/src/Redux/Places/slice';
import eventsSlice from '@infomat/core/src/Redux/Events/slice';
import routesSlice from '@infomat/core/src/Redux/Routes/slice';
import specialPlacesSlice from '@infomat/core/src/Redux/SpecialPlace/slice';

const reducers = {
	[EnumStore.GEOCODING]: geocodingSlice.reducer,
	[EnumStore.USER]: userSlice.reducer,
	[EnumStore.INFORMATION]: informationSlice.reducer,
	[EnumStore.CATEGORY_OBJECT]: categoryObjectSlice.reducer,
	[EnumStore.NOTIFICATIONS]: notificationsSlice.reducer,
	[EnumStore.SUBCATEGORY_OBJECT]: subcategoryObjectSlice.reducer,
	[EnumStore.PLACES]: placesSlice.reducer,
	[EnumStore.EVENTS]: eventsSlice.reducer,
	[EnumStore.ROUTES]: routesSlice.reducer,
	[EnumStore.SPECIAL_PLACES]: specialPlacesSlice.reducer,
};

export const resetAllStores = createAction<{keepLocalStores: boolean} | undefined>('app/reset_all_stores');

const combinedReducers = combineReducers(reducers);

const rootReducer: Reducer<ReturnType<typeof combinedReducers>> = (state, action) => {
	const newState = combinedReducers(action.type === resetAllStores.type ? undefined : state, action);

	return newState;
};

export default enableBatching(rootReducer);
