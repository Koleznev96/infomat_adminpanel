import _ from 'lodash';

import {createSelector} from '@infomat/core/src/Utils/Redux/createSelector';
import {selectAllNotifications} from '@infomat/core/src/Redux/Notifications/Selectors/defaultSelectors';
import {EnumAbstractNotificationVariant} from '@infomat/core/src/Services/UINotification';

export const selectNonErrorNotificationIds = createSelector([selectAllNotifications], (notifications) =>
	_.chain(notifications).reject({severity: EnumAbstractNotificationVariant.ERROR}).map('key').value(),
);
