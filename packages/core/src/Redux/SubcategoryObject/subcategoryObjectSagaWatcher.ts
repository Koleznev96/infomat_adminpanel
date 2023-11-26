import {takeEvery} from 'typed-redux-saga';

import {subcategoryObjectClientToServerActions} from './Actions/subcategoryObjectClientToServerActions';
import getCategoryObjectListSaga from './Sagas/getCategoryObjectListSaga';
import updateCategoryObjectSaga from './Sagas/updateCategoryObjectSaga';
import createCategoryObjectSaga from './Sagas/createCategoryObjectSaga';
import deleteCategoryObjectSaga from './Sagas/deleteCategoryObjectSaga';
import getCategoryObjectDataSaga from './Sagas/getCategoryObjectDataSaga';
import getAllListSaga from './Sagas/getAllListSaga';

function* subcategoryObjectSagaWatcher() {
	yield* takeEvery(subcategoryObjectClientToServerActions.getList.type, getCategoryObjectListSaga);
	yield* takeEvery(subcategoryObjectClientToServerActions.get.type, getCategoryObjectDataSaga);
	yield* takeEvery(subcategoryObjectClientToServerActions.updateCategory.type, updateCategoryObjectSaga);
	yield* takeEvery(subcategoryObjectClientToServerActions.createCategory.type, createCategoryObjectSaga);
	yield* takeEvery(subcategoryObjectClientToServerActions.deleteCategory.type, deleteCategoryObjectSaga);
	yield* takeEvery(subcategoryObjectClientToServerActions.getAllList.type, getAllListSaga);
}

export default subcategoryObjectSagaWatcher;
