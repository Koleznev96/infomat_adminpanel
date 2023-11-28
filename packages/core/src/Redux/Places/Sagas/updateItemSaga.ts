import {put} from 'typed-redux-saga';
import {AxiosResponse} from 'axios';

import {placesClientOnlyActions} from '@infomat/core/src/Redux/Places/Actions/placesClientOnlyActions';
import {placesClientToServerActions} from '@infomat/core/src/Redux/Places/Actions/placesClientToServerActions';
import notificationsClientOnlyActions from '@infomat/core/src/Redux/Notifications/Actions/notificationsClientOnlyActions';
import {EnumNotificationSeverity} from '@infomat/uikit/src/Notification/EnumNotificationSeverity';
import {placesService} from '@infomat/core/src/Services/Api/places.service';
import {TRespounseData} from '@infomat/core/src/Types/PartialBy';
import {TPlacesVM} from '@infomat/core/src/Redux/Places/entityAdapter';

const updateItemSaga = function* ({payload}: ReturnType<typeof placesClientToServerActions.updateCategory>) {
	try {
		const response: AxiosResponse = yield placesService.updateItem(payload);
		const data: TRespounseData<TPlacesVM> = response.data;

		yield* put(placesClientOnlyActions.setData(data.data));

		yield put(
			notificationsClientOnlyActions.enqueuePersistent({
				notificationTitle: 'Туристический объект успешно обновлен',
				duration: 5000,
				severity: EnumNotificationSeverity.SUCCESS,
			}),
		);
	} catch (error) {
		yield* put(placesClientOnlyActions.stopLoading());
	}
};

export default updateItemSaga;
