import {takeEvery} from 'typed-redux-saga';

import getInformationSaga from './Sagas/getInformationSaga';
import updateInformationSaga from './Sagas/updateInformationSaga';
import {informationClientToServerActions} from './Actions/informationClientToServerActions';

function* informationSagaWatcher() {
	yield* takeEvery(informationClientToServerActions.getDeatails.type, getInformationSaga);
	yield* takeEvery(informationClientToServerActions.updateDetails.type, updateInformationSaga);
}

export default informationSagaWatcher;
