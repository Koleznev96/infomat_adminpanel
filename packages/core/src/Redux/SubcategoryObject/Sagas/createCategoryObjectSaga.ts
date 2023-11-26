import {put, call} from 'typed-redux-saga';

import {getNavigationContext} from '@infomat/core/src/Redux/sagaContext';
import {subcategoryObjectClientToServerActions} from '@infomat/core/src/Redux/SubcategoryObject/Actions/subcategoryObjectClientToServerActions';
import {subcategoryObjectClientOnlyActions} from '@infomat/core/src/Redux/SubcategoryObject/Actions/subcategoryObjectClientOnlyActions';
import notificationsClientOnlyActions from '@infomat/core/src/Redux/Notifications/Actions/notificationsClientOnlyActions';
import {EnumNotificationSeverity} from '@infomat/uikit/src/Notification/EnumNotificationSeverity';
import {subcategoryObject} from '@infomat/core/src/Services/Api/subcategoryObject.service';

const createCategoryObjectSaga = function* ({
	payload,
}: ReturnType<typeof subcategoryObjectClientToServerActions.createCategory>) {
	try {
		const {goSubcategoriesObjects} = yield* getNavigationContext();
		yield subcategoryObject.createItem(payload);
		yield put(
			notificationsClientOnlyActions.enqueuePersistent({
				notificationTitle: 'Подкатегория успешно создана',
				duration: 5000,
				severity: EnumNotificationSeverity.SUCCESS,
			}),
		);
		yield* call(goSubcategoriesObjects);
	} catch (error) {
		yield* put(subcategoryObjectClientOnlyActions.stopLoading());
	}
};

export default createCategoryObjectSaga;
