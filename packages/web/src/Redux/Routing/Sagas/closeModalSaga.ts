import {call} from 'typed-redux-saga';

import ServiceFactory from '@infomat/core/src/Services/ServiceFactory';
import {getNavigationContext} from '@infomat/core/src/Redux/sagaContext';

export const closeModalSaga = function* () {
	try {
		const {goUp} = yield* getNavigationContext();

		yield* call(goUp);
	} catch (error) {
		ServiceFactory.logService.error(error, {saga: 'closeModalSaga'});
	}
};
