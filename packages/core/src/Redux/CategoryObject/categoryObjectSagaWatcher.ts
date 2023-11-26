import {takeEvery} from 'typed-redux-saga';

import {categoryObjectClientToServerActions} from './Actions/categoryObjectClientToServerActions';
import getCategoryObjectListSaga from './Sagas/getCategoryObjectListSaga';
import updateCategoryObjectSaga from './Sagas/updateCategoryObjectSaga';
import createCategoryObjectSaga from './Sagas/createCategoryObjectSaga';
import deleteCategoryObjectSaga from './Sagas/deleteCategoryObjectSaga';
import getCategoryObjectDataSaga from './Sagas/getCategoryObjectDataSaga';
import getCategoryObjectAllListSaga from './Sagas/getCategoryObjectAllListSaga';

function* categoryObjectSagaWatcher() {
	yield* takeEvery(categoryObjectClientToServerActions.getList.type, getCategoryObjectListSaga);
	yield* takeEvery(categoryObjectClientToServerActions.get.type, getCategoryObjectDataSaga);
	yield* takeEvery(categoryObjectClientToServerActions.updateCategory.type, updateCategoryObjectSaga);
	yield* takeEvery(categoryObjectClientToServerActions.createCategory.type, createCategoryObjectSaga);
	yield* takeEvery(categoryObjectClientToServerActions.deleteCategory.type, deleteCategoryObjectSaga);
	yield* takeEvery(categoryObjectClientToServerActions.getAllList.type, getCategoryObjectAllListSaga);
}

export default categoryObjectSagaWatcher;
