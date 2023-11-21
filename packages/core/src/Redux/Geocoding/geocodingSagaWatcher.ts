import {takeEvery, fork} from 'typed-redux-saga';

function* geocodingSagaWatcher() {
	// yield* takeEvery(notificationsClientOnlyActions.closeSnackbar.type, closeNotificationsSaga);
	// yield* takeEvery(notificationsClientOnlyActions.closeNonErrorNotifications.type, closeNonErrorNotificationsSaga);
	// yield* fork(enqueueNotificationSaga);
}

export default geocodingSagaWatcher;
