import {fork} from 'typed-redux-saga';

import ServiceFactory from '@infomat/core/src/Services/ServiceFactory';
import startRootSaga from '@infomat/core/src/Redux/startRootSaga';
import sagaMiddleware from '@infomat/core/src/Middleware/sagaMiddleware';
import geocodingSagaWatcher from '@infomat/core/src/Redux/Geocoding/geocodingSagaWatcher';

// import clientSagaWatcher from 'src/Redux/Client/clientSagaWatcher';
// import messagesSagaWatcher from 'src/Redux/Messages/messagesSagaWatcher';
// import previewSagaWatcher from 'src/Redux/Preview/previewSagaWatcher';
// import sessionSagaWatcher from 'src/Redux/Session/sessionSagaWatcher';
// import streamSagaWatcher from 'src/Redux/Stream/streamSagaWatcher';
// import loginFormSagaWatcher from 'src/Redux/LoginForm/loginFormSagaWatcher';
// import mediaPricesSagaWatcher from 'src/Redux/MediaPrices/mediaPricesSagaWatcher';
// import attachmentSagaWatcher from 'src/Redux/Attachment/attachmentSagaWatcher';
// import chatSagaWatcher from 'src/Redux/Chat/chatSagaWatcher';
// import mediaSagaWatcher from 'src/Redux/Media/mediaSagaWatcher';

/**
 * @link https://words.thisishugo.com/how-to-pass-an-api-client-to-a-redux-saga-f35170356c53
 * @constructor
 */
function* rootSaga() {
	const uiContainer = ServiceFactory.uiContainer;

	yield* fork(geocodingSagaWatcher);

	// yield* fork(clientSagaWatcher, uiContainer);
	// yield* fork(loginFormSagaWatcher);
	// yield* fork(sessionSagaWatcher);
	// yield* fork(messagesSagaWatcher, uiContainer);
	// yield* fork(streamSagaWatcher);
	// yield* fork(previewSagaWatcher);
	// yield* fork(attachmentSagaWatcher);
	// yield* fork(mediaPricesSagaWatcher);
	// yield* fork(chatSagaWatcher);
	// yield* fork(mediaSagaWatcher);
}

const sagaRunner = startRootSaga(sagaMiddleware, rootSaga);

export default sagaRunner;
