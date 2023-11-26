import _ from 'lodash';
import {put, select, take} from 'typed-redux-saga';
import {Action} from 'redux';

import notificationsClientOnlyActions from '@infomat/core/src/Redux/Notifications/Actions/notificationsClientOnlyActions';
import {selectNotificationById} from '@infomat/core/src/Redux/Notifications/Selectors/defaultSelectors';
import {EnumNotificationStatus} from '@infomat/core/src/Redux/Notifications/EnumNotificationStatus';

const enqueueNotificationSaga = function* () {
	while (true) {
		try {
			const {payload} = yield* take([
				notificationsClientOnlyActions.enqueuePersistent,
				notificationsClientOnlyActions.enqueueSnackbar,
				notificationsClientOnlyActions.enqueueType,
			]);
			const notification = yield* select(selectNotificationById, payload.key);
			if (!_.isUndefined(notification)) {
				if (notification.status === EnumNotificationStatus.SHOWING) {
					yield* take((action: Action & {payload?: any}) => {
						return (
							action.type === notificationsClientOnlyActions.changeStatus.type &&
							action.payload.key === payload.key &&
							action.payload.status === EnumNotificationStatus.SHOWN
						);
					});
				}

				if (_.includes([EnumNotificationStatus.SHOWN, EnumNotificationStatus.SHOWING], notification.status)) {
					yield* put(notificationsClientOnlyActions.closeSnackbar(payload.key));
					yield* take(
						(action: Action & {payload?: any}) =>
							action.type === notificationsClientOnlyActions.removeSnackbar.type && action.payload === payload.key,
					);
				}
			}
			yield* put(notificationsClientOnlyActions.addNotificationToStore(payload));
		} catch (error) {}
	}
};

export default enqueueNotificationSaga;
