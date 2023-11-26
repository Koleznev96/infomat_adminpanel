import _ from 'lodash';
import {createSelector as selectorCreator} from 'reselect';

import ServiceFactory from '@infomat/core/src/Services/ServiceFactory';

/**
 * @class SelectorsActivityMonitor
 *
 * @description: auxiliary class. Could be used to optimize Redux selectors.
 * @note: before usage enable
 * @example:
 *   window.selectorsActivityMonitor.showStats();
 *
 */
class SelectorsActivityMonitor {
	selectors: {
		[key: string]: ReturnType<typeof selectorCreator>;
	} = {};

	evalCounters: {
		[key: string]: number;
	} = {};

	static init() {
		const instance = new this();
		window.selectorsActivityMonitor = ServiceFactory.env.isReduxSelectorStatsEnabled() ? instance : undefined;

		return instance;
	}

	register(selectorId: string, selector: ReturnType<typeof selectorCreator>) {
		this.selectors[selectorId] = selector;
	}

	incrementEvalCounter(selectorId: string) {
		this.evalCounters[selectorId] = (this.evalCounters[selectorId] ?? 0) + 1;
	}
}

declare global {
	interface Window {
		selectorsActivityMonitor?: SelectorsActivityMonitor;
	}
}

const selectorsActivityMonitor = SelectorsActivityMonitor.init();

export default selectorsActivityMonitor;
