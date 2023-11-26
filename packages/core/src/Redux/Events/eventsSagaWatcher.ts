import {takeEvery} from 'typed-redux-saga';

import getListSaga from './Sagas/getListSaga';
import updateItemSaga from './Sagas/updateItemSaga';
import createItemSaga from './Sagas/createItemSaga';
import deleteItemSaga from './Sagas/deleteItemSaga';
import getDataSaga from './Sagas/getDataSaga';
import {eventsClientToServerActions} from './Actions/eventsClientToServerActions';

function* eventsSagaWatcher() {
	yield* takeEvery(eventsClientToServerActions.getList.type, getListSaga);
	yield* takeEvery(eventsClientToServerActions.get.type, getDataSaga);
	yield* takeEvery(eventsClientToServerActions.updateCategory.type, updateItemSaga);
	yield* takeEvery(eventsClientToServerActions.createCategory.type, createItemSaga);
	yield* takeEvery(eventsClientToServerActions.deleteCategory.type, deleteItemSaga);
}

export default eventsSagaWatcher;
