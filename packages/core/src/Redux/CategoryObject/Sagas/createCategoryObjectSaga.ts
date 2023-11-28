import {put, call, take} from 'typed-redux-saga';
import {AxiosResponse} from 'axios';

import {categoryObjectClientToServerActions} from '@infomat/core/src/Redux/CategoryObject/Actions/categoryObjectClientToServerActions';
import {categoryObjectService} from '@infomat/core/src/Services/Api/categoryObject.service';
import {getNavigationContext} from '@infomat/core/src/Redux/sagaContext';
import {categoryObjectClientOnlyActions} from '@infomat/core/src/Redux/CategoryObject/Actions/categoryObjectClientOnlyActions';
import notificationsClientOnlyActions from '@infomat/core/src/Redux/Notifications/Actions/notificationsClientOnlyActions';
import {EnumNotificationSeverity} from '@infomat/uikit/src/Notification/EnumNotificationSeverity';
import {TCategoryObjectVM} from '@infomat/core/src/Redux/CategoryObject/entityAdapter';
import {TRespounseData} from '@infomat/core/src/Types/PartialBy';

const createCategoryObjectSaga = function* ({
	payload,
}: ReturnType<typeof categoryObjectClientToServerActions.createCategory>) {
	try {
		const {goCategoryObject} = yield* getNavigationContext();

		const response: AxiosResponse = yield categoryObjectService.createItem(payload);
		const data: TRespounseData<TCategoryObjectVM> = response.data;

		yield* call(goCategoryObject, data.data.id);

		yield* take(categoryObjectClientOnlyActions.setData.type);
		yield put(
			notificationsClientOnlyActions.enqueuePersistent({
				notificationTitle: 'Категория успешно создана',
				duration: 5000,
				severity: EnumNotificationSeverity.SUCCESS,
			}),
		);
	} catch (error) {
		yield* put(categoryObjectClientOnlyActions.stopLoading());
	}
};

export default createCategoryObjectSaga;
