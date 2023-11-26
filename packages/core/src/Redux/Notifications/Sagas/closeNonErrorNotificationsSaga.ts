import {put, select} from 'typed-redux-saga';

import notificationsClientOnlyActions from '@infomat/core/src/Redux/Notifications/Actions/notificationsClientOnlyActions';
import {selectNonErrorNotificationIds} from '@infomat/core/src/Redux/Notifications/Selectors/selectNonErrorNotificationIds';

const closeNonErrorNotificationsSaga = function* () {
	try {
		const nonErrorNotificationIds = yield* select(selectNonErrorNotificationIds);
		yield* put(notificationsClientOnlyActions.dismissMany(nonErrorNotificationIds));
	} catch (error) {}
};

export default closeNonErrorNotificationsSaga;
