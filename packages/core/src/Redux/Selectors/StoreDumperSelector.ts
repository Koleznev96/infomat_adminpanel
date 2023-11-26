import {Dictionary} from '@reduxjs/toolkit';
import _ from 'lodash';

import EnumStore from '@infomat/core/src/BusinessLogic/EnumStore';
import IRootState from '@infomat/core/src/Redux/IRootState';

type ValueOf<T> = T[keyof T];

const getStoreDumped = (state: IRootState) => {
	const result: Dictionary<ValueOf<IRootState>> = {};

	try {
		const keys = Object.keys(state);

		keys.forEach((key) => {
			// skip notifications as `notification.action` can be a react component
			if (key === EnumStore.NOTIFICATIONS) {
				return;
			}

			if (!_.isFunction(_.get(state, key))) {
				result[key] = _.isFunction(_.get(state, key).toJS) ? _.get(state, key).toJS() : _.get(state, key);
			}
		});
	} catch (error) {}

	return JSON.stringify(result);
};

export default getStoreDumped;
