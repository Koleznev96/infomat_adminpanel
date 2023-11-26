import {put} from 'typed-redux-saga';

import {placesClientOnlyActions} from '@infomat/core/src/Redux/Places/Actions/placesClientOnlyActions';
import {placesClientToServerActions} from '@infomat/core/src/Redux/Places/Actions/placesClientToServerActions';
import notificationsClientOnlyActions from '@infomat/core/src/Redux/Notifications/Actions/notificationsClientOnlyActions';
import {EnumNotificationSeverity} from '@infomat/uikit/src/Notification/EnumNotificationSeverity';
import {placesService} from '@infomat/core/src/Services/Api/places.service';

const deleteRecommendSaga = function* ({payload}: ReturnType<typeof placesClientToServerActions.deleteRecommend>) {
	try {
		yield placesService.updateItem({id: payload.id, recommended: false});
		yield put(
			notificationsClientOnlyActions.enqueuePersistent({
				notificationTitle: 'Туристический объект удален из рекомендуемых',
				duration: 5000,
				severity: EnumNotificationSeverity.SUCCESS,
			}),
		);
		yield* put(placesClientToServerActions.getList({recommendedOnly: true}));
	} catch (error) {
		yield* put(placesClientOnlyActions.stopLoading());
	}
};

export default deleteRecommendSaga;
