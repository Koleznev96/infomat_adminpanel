import {put} from 'typed-redux-saga';
import _ from 'lodash';
import {AxiosResponse} from 'axios';

import {userClientToServerActions} from '@infomat/core/src/Redux/User/Actions/userClientToServerActions';
import {userClientOnlyActions} from '@infomat/core/src/Redux/User/Actions/userClientOnlyActions';
import {authService} from '@infomat/core/src/Services/Api/auth.service';

const loginUserSaga = function* ({payload: {password, login}}: ReturnType<typeof userClientToServerActions.login>) {
	try {
		if (!_.isEmpty(password) && !_.isEmpty(login)) {
			const response: AxiosResponse = yield authService.login(login, password);
			if (response.status === 200 || response.status === 201) {
				yield* put(userClientOnlyActions.login());
			}
		}
	} catch (error) {
		yield* put(userClientOnlyActions.upsetDetailes({error: 'Не верный пароль или логин'}));
	}
};

export default loginUserSaga;
