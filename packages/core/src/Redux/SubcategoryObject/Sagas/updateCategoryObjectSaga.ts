import {put, call} from 'typed-redux-saga';

import {subcategoryObjectClientToServerActions} from '@infomat/core/src/Redux/SubcategoryObject/Actions/subcategoryObjectClientToServerActions';
import {subcategoryObjectClientOnlyActions} from '@infomat/core/src/Redux/SubcategoryObject/Actions/subcategoryObjectClientOnlyActions';
import {getNavigationContext} from '@infomat/core/src/Redux/sagaContext';
import {subcategoryObject} from '@infomat/core/src/Services/Api/subcategoryObject.service';
import notificationsClientOnlyActions from '@infomat/core/src/Redux/Notifications/Actions/notificationsClientOnlyActions';
import {EnumNotificationSeverity} from '@infomat/uikit/src/Notification/EnumNotificationSeverity';

const updateCategoryObjectSaga = function* ({
	payload,
}: ReturnType<typeof subcategoryObjectClientToServerActions.updateCategory>) {
	try {
		const {goSubcategoriesObjects} = yield* getNavigationContext();
		yield subcategoryObject.updateItem(payload);
		yield put(
			notificationsClientOnlyActions.enqueuePersistent({
				notificationTitle: 'Подкатегория успешно обновлена',
				duration: 5000,
				severity: EnumNotificationSeverity.SUCCESS,
			}),
		);
		yield* call(goSubcategoriesObjects);
	} catch (error) {
		yield* put(subcategoryObjectClientOnlyActions.stopLoading());
	}
};

export default updateCategoryObjectSaga;
