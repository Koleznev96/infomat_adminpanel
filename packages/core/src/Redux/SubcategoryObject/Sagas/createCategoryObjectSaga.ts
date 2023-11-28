import {put, call, take} from 'typed-redux-saga';
import {AxiosResponse} from 'axios';

import {getNavigationContext} from '@infomat/core/src/Redux/sagaContext';
import {subcategoryObjectClientToServerActions} from '@infomat/core/src/Redux/SubcategoryObject/Actions/subcategoryObjectClientToServerActions';
import {subcategoryObjectClientOnlyActions} from '@infomat/core/src/Redux/SubcategoryObject/Actions/subcategoryObjectClientOnlyActions';
import notificationsClientOnlyActions from '@infomat/core/src/Redux/Notifications/Actions/notificationsClientOnlyActions';
import {EnumNotificationSeverity} from '@infomat/uikit/src/Notification/EnumNotificationSeverity';
import {subcategoryObject} from '@infomat/core/src/Services/Api/subcategoryObject.service';
import {TRespounseData} from '@infomat/core/src/Types/PartialBy';
import {TSubcategoryObjectVM} from '@infomat/core/src/Redux/SubcategoryObject/entityAdapter';

const createCategoryObjectSaga = function* ({
	payload,
}: ReturnType<typeof subcategoryObjectClientToServerActions.createCategory>) {
	try {
		const {goSubcategoryObject} = yield* getNavigationContext();
		const response: AxiosResponse = yield subcategoryObject.createItem(payload);
		const data: TRespounseData<TSubcategoryObjectVM> = response.data;

		yield* call(goSubcategoryObject, data.data.id);

		yield* take(subcategoryObjectClientOnlyActions.setData.type);
		yield put(
			notificationsClientOnlyActions.enqueuePersistent({
				notificationTitle: 'Подкатегория успешно создана',
				duration: 5000,
				severity: EnumNotificationSeverity.SUCCESS,
			}),
		);
	} catch (error) {
		yield* put(subcategoryObjectClientOnlyActions.stopLoading());
	}
};

export default createCategoryObjectSaga;
