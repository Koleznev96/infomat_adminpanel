import {put} from 'typed-redux-saga';

import {userClientOnlyActions} from '@infomat/core/src/Redux/User/Actions/userClientOnlyActions';

const handleRequestError = function* () {
	try {
		yield* put(userClientOnlyActions.upsetDetailes({}));
	} catch (error) {}
};

export default handleRequestError;
