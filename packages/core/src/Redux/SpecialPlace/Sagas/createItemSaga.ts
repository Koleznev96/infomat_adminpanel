import {put, call, take} from 'typed-redux-saga';
import {AxiosResponse} from 'axios';

import {specialPlacesClientToServerActions} from '@infomat/core/src/Redux/SpecialPlace/Actions/specialPlacesClientToServerActions';
import {specialPlacesClientOnlyActions} from '@infomat/core/src/Redux/SpecialPlace/Actions/specialPlacesClientOnlyActions';
import {getNavigationContext} from '@infomat/core/src/Redux/sagaContext';
import notificationsClientOnlyActions from '@infomat/core/src/Redux/Notifications/Actions/notificationsClientOnlyActions';
import {EnumNotificationSeverity} from '@infomat/uikit/src/Notification/EnumNotificationSeverity';
import {TRespounseData} from '@infomat/core/src/Types/PartialBy';
import {TSpecialPlaceVM} from '@infomat/core/src/Redux/SpecialPlace/entityAdapter';
import {specialPlacesService} from '@infomat/core/src/Services/Api/specialPlaces.service';

const createItemSaga = function* ({payload}: ReturnType<typeof specialPlacesClientToServerActions.createCategory>) {
	try {
		const {goSpecialPlace} = yield* getNavigationContext();
		const response: AxiosResponse = yield specialPlacesService.createItem(payload);
		const data: TRespounseData<TSpecialPlaceVM> = response.data;
		yield* call(goSpecialPlace, data.data.id);
		yield* take(specialPlacesClientOnlyActions.setData.type);
		yield put(
			notificationsClientOnlyActions.enqueuePersistent({
				notificationTitle: 'Объект успешно создан',
				duration: 5000,
				severity: EnumNotificationSeverity.SUCCESS,
			}),
		);
	} catch (error) {
		yield* put(specialPlacesClientOnlyActions.stopLoading());
	}
};

export default createItemSaga;
