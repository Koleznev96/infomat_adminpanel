import {put} from 'typed-redux-saga';
import {AxiosResponse} from 'axios';

import {categoryObjectClientToServerActions} from '@infomat/core/src/Redux/CategoryObject/Actions/categoryObjectClientToServerActions';
import {categoryObjectService} from '@infomat/core/src/Services/Api/categoryObject.service';
import {categoryObjectClientOnlyActions} from '@infomat/core/src/Redux/CategoryObject/Actions/categoryObjectClientOnlyActions';
import notificationsClientOnlyActions from '@infomat/core/src/Redux/Notifications/Actions/notificationsClientOnlyActions';
import {EnumNotificationSeverity} from '@infomat/uikit/src/Notification/EnumNotificationSeverity';
import {TCategoryObjectVM} from '@infomat/core/src/Redux/CategoryObject/entityAdapter';
import {TRespounseData} from '@infomat/core/src/Types/PartialBy';

const updateCategoryObjectSaga = function* ({
	payload,
}: ReturnType<typeof categoryObjectClientToServerActions.updateCategory>) {
	try {
		const response: AxiosResponse = yield categoryObjectService.updateItem(payload);
		const data: TRespounseData<TCategoryObjectVM> = response.data;

		yield* put(categoryObjectClientOnlyActions.setData(data.data));

		yield put(
			notificationsClientOnlyActions.enqueuePersistent({
				notificationTitle: 'Категория успешно обновлена',
				duration: 5000,
				severity: EnumNotificationSeverity.SUCCESS,
			}),
		);
	} catch (error) {
		yield* put(categoryObjectClientOnlyActions.stopLoading());
	}
};

export default updateCategoryObjectSaga;
