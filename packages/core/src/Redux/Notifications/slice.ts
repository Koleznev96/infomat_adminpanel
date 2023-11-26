import {createSlice, EntityState, SliceCaseReducers} from '@reduxjs/toolkit';

import EnumStore from '@infomat/core/src/BusinessLogic/EnumStore';
import {notificationsAdapter, TNotification} from '@infomat/core/src/Redux/Notifications/entityAdapter';
import notificationsClientOnlyActions from '@infomat/core/src/Redux/Notifications/Actions/notificationsClientOnlyActions';

export const initialNotificationsState = notificationsAdapter.getInitialState();

const notificationsSlice = createSlice<TNotificationsSlice, SliceCaseReducers<TNotificationsSlice>, EnumStore>({
	name: EnumStore.NOTIFICATIONS,
	initialState: initialNotificationsState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(notificationsClientOnlyActions.resetStore, () => initialNotificationsState);
		builder.addCase(notificationsClientOnlyActions.addNotificationToStore, notificationsAdapter.upsertOne);
		builder.addCase(notificationsClientOnlyActions.removeSnackbar, notificationsAdapter.removeOne);
		builder.addCase(notificationsClientOnlyActions.dismissMany, notificationsAdapter.updateMany);
		builder.addCase(notificationsClientOnlyActions.changeStatus, (state, {payload}) =>
			notificationsAdapter.updateOne(state, {
				id: payload.key,
				changes: {
					status: payload.status,
				},
			}),
		);
	},
});

export type TNotificationsSlice = EntityState<TNotification>;

export default notificationsSlice;
