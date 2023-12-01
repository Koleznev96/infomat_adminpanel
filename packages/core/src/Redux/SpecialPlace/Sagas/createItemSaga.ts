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
		console.log('2222222222222');
		const response: AxiosResponse = yield specialPlacesService.createItem(payload);
		console.log('1111111');
		const data: TRespounseData<TSpecialPlaceVM> = response.data;
		console.log('nnnmmmm');
		yield* call(goSpecialPlace, data.data.id);
		console.log('3333333333');
		yield* take(specialPlacesClientOnlyActions.setData.type);
		console.log('4444444444');
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
