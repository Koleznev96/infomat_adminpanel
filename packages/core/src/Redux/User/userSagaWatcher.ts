import {takeEvery} from 'typed-redux-saga';

import loginUserSaga from './Sagas/loginUserSaga';
import {userClientToServerActions} from './Actions/userClientToServerActions';
import handleRequestError from './Sagas/handleRequestError';

function* userSagaWatcher() {
	yield* takeEvery(userClientToServerActions.login.type, loginUserSaga);
}

export default userSagaWatcher;
