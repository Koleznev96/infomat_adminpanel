import {put, select} from 'typed-redux-saga';
import _ from 'lodash';
import {EntityId} from '@reduxjs/toolkit';

import notificationsClientOnlyActions from '@infomat/core/src/Redux/Notifications/Actions/notificationsClientOnlyActions';
import {selectNotificationsIds} from '@infomat/core/src/Redux/Notifications/Selectors/defaultSelectors';

const closeNotificationsSaga = function* ({
	payload: notificationKey,
}: ReturnType<typeof notificationsClientOnlyActions['closeSnackbar']>) {
	try {
		if (!_.isEmpty(notificationKey)) {
			yield* put(notificationsClientOnlyActions.dismissMany([notificationKey as EntityId]));
		} else {
			const allNotificationsIds = yield* select(selectNotificationsIds);
			yield* put(notificationsClientOnlyActions.dismissMany(allNotificationsIds));
		}
	} catch (error) {}
};

export default closeNotificationsSaga;
