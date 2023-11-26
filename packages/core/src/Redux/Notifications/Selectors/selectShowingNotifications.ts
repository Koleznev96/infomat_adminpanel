import _ from 'lodash';

import {createSelector} from '@infomat/core/src/Utils/Redux/createSelector';
import {selectAllNotifications} from '@infomat/core/src/Redux/Notifications/Selectors/defaultSelectors';
import {EnumNotificationStatus} from '@infomat/core/src/Redux/Notifications/EnumNotificationStatus';

export const selectShowingNotifications = createSelector([selectAllNotifications], (notifications) =>
	_.filter(notifications, (notification) => notification.status === EnumNotificationStatus.SHOWING),
);
