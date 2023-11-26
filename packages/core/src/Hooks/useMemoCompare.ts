import _ from 'lodash';
import {useRef} from 'react';

import {useIsFirstRender} from './useIsFirstRender';
import {usePrevious} from './usePrevious';

export const useMemoCompare = <TOutput, TInput>(
	getter: (arg: TInput) => TOutput,
	value: TInput,
	comparator: (previous: TInput | undefined, next: TInput) => boolean = _.isEqual,
): TOutput => {
	const resultRef = useRef<TOutput>();

	const previous = usePrevious(value);

	if (useIsFirstRender() || !comparator(previous, value)) {
		resultRef.current = getter(value);
	}

	return resultRef.current as TOutput;
};
