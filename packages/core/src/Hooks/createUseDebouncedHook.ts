import _ from 'lodash';

import {useMemoCompare} from '@infomat/core/src/Hooks/useMemoCompare';
import {useUnmountEffect} from '@infomat/core/src/Hooks/useUnmountEffect';
import {useStableCallback} from '@infomat/core/src/Hooks/useStableCallback';

enum EnumUnmountAction {
	NONE,
	CANCEL,
	FLUSH,
}

export const createUseDebouncedHook =
	<TDebounceFn extends typeof _.debounce | typeof _.throttle>(debounceFn: TDebounceFn) =>
	<T extends Parameters<TDebounceFn>[0]>(
		fn: T,
		wait?: Parameters<TDebounceFn>[1],
		options?: Parameters<TDebounceFn>[2],
		unmountAction = EnumUnmountAction.CANCEL,
	): _.DebouncedFunc<T> => {
		const stableFn = useStableCallback(fn);
		const debounced = useMemoCompare((arg) => debounceFn(stableFn, arg.wait, arg.options), {wait, options});
		const callbackIsUnmountFlush = unmountAction === EnumUnmountAction.FLUSH ? debounced.flush : _.noop;
		useUnmountEffect(unmountAction === EnumUnmountAction.CANCEL ? debounced.cancel : callbackIsUnmountFlush);
		return debounced;
	};
