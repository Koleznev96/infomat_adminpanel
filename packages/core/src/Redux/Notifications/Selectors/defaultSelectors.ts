import IRootState from '@infomat/core/src/Redux/IRootState';
import EnumStore from '@infomat/core/src/BusinessLogic/EnumStore';
import {notificationsAdapter} from '@infomat/core/src/Redux/Notifications/entityAdapter';

export const {
	selectIds: selectNotificationsIds,
	selectAll: selectAllNotifications,
	selectById: selectNotificationById,
} = notificationsAdapter.getSelectors<IRootState>((state) => state[EnumStore.NOTIFICATIONS]);
