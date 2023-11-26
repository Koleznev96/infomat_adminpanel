import {useEffect, useRef} from 'react';

export const useUnmountEffect = (callback: () => void) => {
	const ref = useRef(callback);
	ref.current = callback;

	useEffect(() => () => ref.current(), []);
};
