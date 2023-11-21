import {createLogger} from 'redux-logger';
import {Action, Middleware} from 'redux';

import ServiceFactory from '@infomat/core/src/Services/ServiceFactory';
import sagaMiddleware from '@infomat/core/src/Middleware/sagaMiddleware';

const middleware: Middleware[] = [sagaMiddleware];

export default middleware;
