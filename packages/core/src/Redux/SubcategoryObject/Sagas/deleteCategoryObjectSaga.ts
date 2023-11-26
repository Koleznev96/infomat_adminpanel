import {put, call} from 'typed-redux-saga';

import {getNavigationContext} from '@infomat/core/src/Redux/sagaContext';
import {subcategoryObject} from '@infomat/core/src/Services/Api/subcategoryObject.service';
import notificationsClientOnlyActions from '@infomat/core/src/Redux/Notifications/Actions/notificationsClientOnlyActions';
import {EnumNotificationSeverity} from '@infomat/uikit/src/Notification/EnumNotificationSeverity';
import {subcategoryObjectClientToServerActions} from '@infomat/core/src/Redux/SubcategoryObject/Actions/subcategoryObjectClientToServerActions';
import {subcategoryObjectClientOnlyActions} from '@infomat/core/src/Redux/SubcategoryObject/Actions/subcategoryObjectClientOnlyActions';

const deleteCategoryObjectSaga = function* ({
	payload,
}: ReturnType<typeof subcategoryObjectClientToServerActions.deleteCategory>) {
	try {
		const {goSubcategoriesObjects} = yield* getNavigationContext();
		yield subcategoryObject.deleteItem(payload.id);
		yield put(
			notificationsClientOnlyActions.enqueuePersistent({
				notificationTitle: 'Подкатегория успешно удалена',
				duration: 5000,
				severity: EnumNotificationSeverity.SUCCESS,
			}),
		);
		yield* call(goSubcategoriesObjects);
	} catch (error) {
		yield* put(subcategoryObjectClientOnlyActions.stopLoading());
	}
};

export default deleteCategoryObjectSaga;
