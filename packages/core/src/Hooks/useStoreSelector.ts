import {useSelector} from 'react-redux';

import IRootState from '@infomat/core/src/Redux/IRootState';

export const useStoreSelector = <T, P extends any[]>(
	selector: (state: IRootState, ...params: P) => T,
	...params: P
): T => {
	const selectorFunc = (state: IRootState) => selector(state, ...params);

	return useSelector(selectorFunc);
};
