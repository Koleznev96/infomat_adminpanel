import {useRef} from 'react';

export const useIsFirstRender = () => {
	const isFirstRenderRef = useRef(true);

	const isFirstRender = isFirstRenderRef.current;
	isFirstRenderRef.current = false;

	return isFirstRender;
};
