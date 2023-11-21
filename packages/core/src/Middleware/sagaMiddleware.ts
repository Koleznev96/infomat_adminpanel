import createSagaMiddleware from 'redux-saga';

import {TSagaContext} from '@infomat/core/src/Redux/sagaContext';

const sagaMiddleware = createSagaMiddleware<TSagaContext>();

export default sagaMiddleware;
