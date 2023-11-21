import {takeEvery} from 'typed-redux-saga';

import {feedbackClientOnlyActions} from '@infomat/core/src/Redux/Feedback/Actions/feedbackClientOnlyActions';
import {routingClientOnlyActions} from '@infomat/core/src/Redux/Routing/Actions/routingClientOnlyActions';

import {updateStateOnChatNavigationSaga} from 'src/Redux/Routing/Sagas/updateStateOnChatNavigationSaga';
import {closeModalSaga} from 'src/Redux/Routing/Sagas/closeModalSaga';
import {handleNotFoundSaga} from 'src/Redux/Routing/Sagas/handleNotFoundSaga';
import navigateToChannelOrChatSaga from 'src/Redux/Routing/Sagas/navigateToChannelOrChatSaga';

function* routingSagaWatcher() {
	yield* takeEvery(routingClientOnlyActions.updateStateAfterNavigation, updateStateOnChatNavigationSaga);
	yield* takeEvery(routingClientOnlyActions.navigateChatOrChannel, navigateToChannelOrChatSaga);
	yield* takeEvery(feedbackClientOnlyActions.success, closeModalSaga);
	yield* takeEvery('*', handleNotFoundSaga);
}

export default routingSagaWatcher;
