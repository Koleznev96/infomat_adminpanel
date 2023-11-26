import {useRef} from 'react';

export const usePrevious = <T>(value: T): T | undefined => {
	const ref = useRef<T>();

	const previous = ref.current;
	ref.current = value;

	return previous;
};
