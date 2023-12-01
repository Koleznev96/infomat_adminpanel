import {takeEvery} from 'typed-redux-saga';

import getListSaga from './Sagas/getListSaga';
import updateItemSaga from './Sagas/updateItemSaga';
import createItemSaga from './Sagas/createItemSaga';
import deleteItemSaga from './Sagas/deleteItemSaga';
import getDataSaga from './Sagas/getDataSaga';
import {specialPlacesClientToServerActions} from './Actions/specialPlacesClientToServerActions';

function* specialPlacesSagaWatcher() {
	yield* takeEvery(specialPlacesClientToServerActions.getList.type, getListSaga);
	yield* takeEvery(specialPlacesClientToServerActions.get.type, getDataSaga);
	yield* takeEvery(specialPlacesClientToServerActions.updateCategory.type, updateItemSaga);
	yield* takeEvery(specialPlacesClientToServerActions.createCategory.type, createItemSaga);
	yield* takeEvery(specialPlacesClientToServerActions.deleteCategory.type, deleteItemSaga);
}

export default specialPlacesSagaWatcher;
