import {put, call} from 'typed-redux-saga';

import {categoryObjectClientToServerActions} from '@infomat/core/src/Redux/CategoryObject/Actions/categoryObjectClientToServerActions';
import {categoryObjectService} from '@infomat/core/src/Services/Api/categoryObject.service';
import {getNavigationContext} from '@infomat/core/src/Redux/sagaContext';
import {categoryObjectClientOnlyActions} from '@infomat/core/src/Redux/CategoryObject/Actions/categoryObjectClientOnlyActions';
import notificationsClientOnlyActions from '@infomat/core/src/Redux/Notifications/Actions/notificationsClientOnlyActions';
import {EnumNotificationSeverity} from '@infomat/uikit/src/Notification/EnumNotificationSeverity';

const createCategoryObjectSaga = function* ({
	payload,
}: ReturnType<typeof categoryObjectClientToServerActions.createCategory>) {
	try {
		const {goCategoriesObjects} = yield* getNavigationContext();
		yield categoryObjectService.createItem(payload);
		yield put(
			notificationsClientOnlyActions.enqueuePersistent({
				notificationTitle: 'Категория успешно создана',
				duration: 5000,
				severity: EnumNotificationSeverity.SUCCESS,
			}),
		);
		yield* call(goCategoriesObjects);
	} catch (error) {
		yield* put(categoryObjectClientOnlyActions.stopLoading());
	}
};

export default createCategoryObjectSaga;
