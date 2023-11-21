import {DependencyList, useEffect, useState, useRef} from 'react';

import {useThrottled} from './useThrottled';
import {useDebounced} from './useDebounced';

export const createUseDebouncedMemoHook =
	<TDebounceHook extends typeof useDebounced | typeof useThrottled>(debounceHook: TDebounceHook) =>
	<T>(fn: () => T, dependencies: DependencyList, time: number, options?: Parameters<TDebounceHook>[2]): T => {
		const [state, setState] = useState<T>(fn);

		const updateState = debounceHook(() => setState(fn()), time, options);

		const isFirstEffectRef = useRef(true);

		useEffect(() => {
			if (!isFirstEffectRef.current) {
				updateState();
			}
			isFirstEffectRef.current = false;
		}, dependencies); // eslint-disable-line react-hooks/exhaustive-deps

		return state;
	};
