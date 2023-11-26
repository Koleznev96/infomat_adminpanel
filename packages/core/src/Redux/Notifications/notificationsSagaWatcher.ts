import {takeEvery, fork} from 'typed-redux-saga';

import notificationsClientOnlyActions from '@infomat/core/src/Redux/Notifications/Actions/notificationsClientOnlyActions';
import closeNotificationsSaga from '@infomat/core/src/Redux/Notifications/Sagas/closeNotificationsSaga';
import closeNonErrorNotificationsSaga from '@infomat/core/src/Redux/Notifications/Sagas/closeNonErrorNotificationsSaga';
import enqueueNotificationSaga from '@infomat/core/src/Redux/Notifications/Sagas/enqueueNotificationSaga';

function* notificationsSagaWatcher() {
	yield* takeEvery(notificationsClientOnlyActions.closeSnackbar.type, closeNotificationsSaga);
	yield* takeEvery(notificationsClientOnlyActions.closeNonErrorNotifications.type, closeNonErrorNotificationsSaga);
	yield* fork(enqueueNotificationSaga);
}

export default notificationsSagaWatcher;
