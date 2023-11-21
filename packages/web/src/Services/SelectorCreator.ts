import 'reflect-metadata';
import {createSelector} from '@reduxjs/toolkit';
import _ from 'lodash';
import {container, singleton} from 'tsyringe';

import selectorsActivityMonitor from '@infomat/core/src/Services/Redux/selectorsActivityMonitor';
import DIToken from '@infomat/core/src/BusinessLogic/DIToken';

@singleton()
class SelectorCreator {
	create(args: any) {
		const selectorId = _.uniqueId('Selector');
		const selector = createSelector(...args);

		selectorsActivityMonitor.register(selectorId, selector);

		return (...args1: any) => {
			selectorsActivityMonitor.incrementEvalCounter(selectorId);
			const startMark = `${selectorId}-StartMark`;
			const endMark = `${selectorId}-EndMark`;

			window.performance.mark(startMark);

			// eslint-disable-next-line prefer-spread
			const res = selector.apply(null, args1);

			window.performance.mark(endMark);
			window.performance.measure(`♻️ ${selectorId}`, startMark, endMark);
			window.performance.clearMarks(startMark);
			window.performance.clearMarks(endMark);
			window.performance.clearMeasures(startMark);
			window.performance.clearMeasures(endMark);

			return res;
		};
	}
}

container.register(DIToken.SelectorCreator, {useToken: SelectorCreator});

export default SelectorCreator;
