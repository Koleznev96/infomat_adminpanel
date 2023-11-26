import {takeEvery} from 'typed-redux-saga';

import {routingClientOnlyActions} from '@infomat/core/src/Redux/Routing/Actions/routingClientOnlyActions';

import {updateStateOnChatNavigationSaga} from 'src/Redux/Routing/Sagas/updateStateOnChatNavigationSaga';

function* routingSagaWatcher() {
	yield* takeEvery(routingClientOnlyActions.updateStateAfterNavigation, updateStateOnChatNavigationSaga);
}

export default routingSagaWatcher;
