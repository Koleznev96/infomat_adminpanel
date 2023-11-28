import {put} from 'typed-redux-saga';
import {AxiosResponse} from 'axios';

import {subcategoryObjectClientToServerActions} from '@infomat/core/src/Redux/SubcategoryObject/Actions/subcategoryObjectClientToServerActions';
import {subcategoryObjectClientOnlyActions} from '@infomat/core/src/Redux/SubcategoryObject/Actions/subcategoryObjectClientOnlyActions';
import {subcategoryObject} from '@infomat/core/src/Services/Api/subcategoryObject.service';
import notificationsClientOnlyActions from '@infomat/core/src/Redux/Notifications/Actions/notificationsClientOnlyActions';
import {EnumNotificationSeverity} from '@infomat/uikit/src/Notification/EnumNotificationSeverity';
import {TRespounseData} from '@infomat/core/src/Types/PartialBy';
import {TSubcategoryObjectVM} from '@infomat/core/src/Redux/SubcategoryObject/entityAdapter';

const updateCategoryObjectSaga = function* ({
	payload,
}: ReturnType<typeof subcategoryObjectClientToServerActions.updateCategory>) {
	try {
		const response: AxiosResponse = yield subcategoryObject.updateItem(payload);
		const data: TRespounseData<TSubcategoryObjectVM> = response.data;

		yield* put(subcategoryObjectClientOnlyActions.setData(data.data));

		yield put(
			notificationsClientOnlyActions.enqueuePersistent({
				notificationTitle: 'Подкатегория успешно обновлена',
				duration: 5000,
				severity: EnumNotificationSeverity.SUCCESS,
			}),
		);
	} catch (error) {
		yield* put(subcategoryObjectClientOnlyActions.stopLoading());
	}
};

export default updateCategoryObjectSaga;
