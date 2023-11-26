import {takeEvery} from 'typed-redux-saga';

import getListSaga from './Sagas/getListSaga';
import updateItemSaga from './Sagas/updateItemSaga';
import createItemSaga from './Sagas/createItemSaga';
import deleteItemSaga from './Sagas/deleteItemSaga';
import getDataSaga from './Sagas/getDataSaga';
import {routesClientToServerActions} from './Actions/routesClientToServerActions';

function* routesSagaWatcher() {
	yield* takeEvery(routesClientToServerActions.getList.type, getListSaga);
	yield* takeEvery(routesClientToServerActions.get.type, getDataSaga);
	yield* takeEvery(routesClientToServerActions.updateCategory.type, updateItemSaga);
	yield* takeEvery(routesClientToServerActions.createCategory.type, createItemSaga);
	yield* takeEvery(routesClientToServerActions.deleteCategory.type, deleteItemSaga);
}

export default routesSagaWatcher;
