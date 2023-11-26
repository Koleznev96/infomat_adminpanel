import {Dispatch, PayloadAction} from '@reduxjs/toolkit';
import {Middleware} from 'redux';

import IRootState from '@infomat/core/src/Redux/IRootState';

const reduxTimingMiddleware: Middleware<{}, IRootState, Dispatch> =
	(_store: any) => (next: Dispatch<PayloadAction>) => (action: PayloadAction) => {
		return next(action);

		performance.mark(`${action.type}_start`);
		const result = next(action);
		performance.mark(`${action.type}_end`);
		performance.measure(`${action.type}`, `${action.type}_start`, `${action.type}_end`);

		return result;
	};

export default reduxTimingMiddleware;
