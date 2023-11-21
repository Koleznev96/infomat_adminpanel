import {FC, useEffect} from 'react';

import {useDebounced} from '@infomat/core/src/Hooks/useDebounced';

/**
 * @link https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
 */
const VerticalHeightUnitAdjuster: FC = () => {
	const adjustHeight = useDebounced(() => {
		const vh = window.innerHeight * 0.01;

		document.documentElement.style.setProperty('--vh', `${vh}px`);
	}, 400);

	useEffect(() => {
		adjustHeight();
		window.addEventListener('resize', adjustHeight);
		return () => window.removeEventListener('resize', adjustHeight);
	}, [adjustHeight]);

	return null;
};

export default VerticalHeightUnitAdjuster;
