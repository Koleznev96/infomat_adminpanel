import {createSelector as selectorCreator, ParametricSelector} from 'reselect';

import ServiceFactory from '@infomat/core/src/Services/ServiceFactory';

export const createSelector = ((
	...args: [ParametricSelector<unknown, unknown, unknown>[], (...res: unknown[]) => unknown]
) =>
	ServiceFactory.env.isReduxSelectorStatsEnabled()
		? ServiceFactory.selectorCreator.create(args)
		: selectorCreator.apply(selectorCreator, args)) as typeof selectorCreator;
