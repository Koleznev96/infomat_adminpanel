import {createLogger} from 'redux-logger';
import {Action} from 'redux';

import ServiceFactory from '@infomat/core/src/Services/ServiceFactory';
import sagaMiddleware from '@infomat/core/src/Middleware/sagaMiddleware';

const middleware = [sagaMiddleware];

// const ignoreActions = ServiceFactory.env.getReduxIgnoredActions();

// if (ServiceFactory.env.reduxLoggerEnabled()) {
// 	middleware.push(
// 		createLogger({
// 			collapsed: true,
// 			duration: true,
// 			predicate: (_: any, action: Action) => !ignoreActions.includes(action.type),
// 		}),
// 	);
// }

export default middleware;
