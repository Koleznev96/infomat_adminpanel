import {put, call} from 'typed-redux-saga';

import {categoryObjectClientToServerActions} from '@infomat/core/src/Redux/CategoryObject/Actions/categoryObjectClientToServerActions';
import {getNavigationContext} from '@infomat/core/src/Redux/sagaContext';
import {categoryObjectService} from '@infomat/core/src/Services/Api/categoryObject.service';
import {categoryObjectClientOnlyActions} from '@infomat/core/src/Redux/CategoryObject/Actions/categoryObjectClientOnlyActions';
import notificationsClientOnlyActions from '@infomat/core/src/Redux/Notifications/Actions/notificationsClientOnlyActions';
import {EnumNotificationSeverity} from '@infomat/uikit/src/Notification/EnumNotificationSeverity';

const deleteCategoryObjectSaga = function* ({
	payload,
}: ReturnType<typeof categoryObjectClientToServerActions.deleteCategory>) {
	try {
		const {goCategoriesObjects} = yield* getNavigationContext();
		yield categoryObjectService.deleteItem(payload.id);
		yield put(
			notificationsClientOnlyActions.enqueuePersistent({
				notificationTitle: 'Категория успешно удалена',
				duration: 5000,
				severity: EnumNotificationSeverity.SUCCESS,
			}),
		);
		yield* call(goCategoriesObjects);
	} catch (error) {
		yield* put(categoryObjectClientOnlyActions.stopLoading());
	}
};

export default deleteCategoryObjectSaga;
