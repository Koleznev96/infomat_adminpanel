import {put} from 'typed-redux-saga';
import {AxiosResponse} from 'axios';

import {specialPlacesClientToServerActions} from '@infomat/core/src/Redux/SpecialPlace/Actions/specialPlacesClientToServerActions';
import {specialPlacesClientOnlyActions} from '@infomat/core/src/Redux/SpecialPlace/Actions/specialPlacesClientOnlyActions';
import notificationsClientOnlyActions from '@infomat/core/src/Redux/Notifications/Actions/notificationsClientOnlyActions';
import {EnumNotificationSeverity} from '@infomat/uikit/src/Notification/EnumNotificationSeverity';
import {TRespounseData} from '@infomat/core/src/Types/PartialBy';
import {TSpecialPlaceVM} from '@infomat/core/src/Redux/SpecialPlace/entityAdapter';
import {specialPlacesService} from '@infomat/core/src/Services/Api/specialPlaces.service';

const updateItemSaga = function* ({payload}: ReturnType<typeof specialPlacesClientToServerActions.updateCategory>) {
	try {
		const response: AxiosResponse = yield specialPlacesService.updateItem(payload);
		const data: TRespounseData<TSpecialPlaceVM> = response.data;

		yield* put(specialPlacesClientOnlyActions.setData(data.data));

		yield put(
			notificationsClientOnlyActions.enqueuePersistent({
				notificationTitle: 'Объект успешно обновлен',
				duration: 5000,
				severity: EnumNotificationSeverity.SUCCESS,
			}),
		);
	} catch (error) {
		yield* put(specialPlacesClientOnlyActions.stopLoading());
	}
};

export default updateItemSaga;
