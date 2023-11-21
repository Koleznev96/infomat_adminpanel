import {Action, Middleware} from 'redux';
import {configureStore} from '@reduxjs/toolkit';

import IRootState from '@infomat/core/src/Redux/IRootState';
import rootReducer from '@infomat/core/src/Redux/Reducers';
import ServiceFactory from '@infomat/core/src/Services/ServiceFactory';

const createStore = (middleware: Middleware[]) => {
	const store = configureStore<IRootState, Action, Middleware[]>({
		reducer: rootReducer,
		middleware,
		devTools: !ServiceFactory.env.reduxDevToolsEnabled()
			? false
			: {
					name: ServiceFactory.env.getName(),
					actionsDenylist: ServiceFactory.env.getReduxIgnoredActions(),
			  },
	});

	if (module?.hot) {
		const path = '../core/src/Redux/Reducers/index.ts';

		module.hot.accept(path, () => {
			// eslint-disable-next-line @typescript-eslint/no-var-requires
			store.replaceReducer(require('@infomat/core/src/Redux/Reducers').default);
		});
	}

	return store;
};

export default createStore;
