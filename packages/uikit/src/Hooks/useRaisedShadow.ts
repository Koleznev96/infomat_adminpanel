import {animate, MotionValue, useMotionValue} from 'framer-motion';
import {useEffect} from 'react';

const inactiveShadow = '0px 0px 0px rgba(0,0,0,0.5)';

export function useRaisedShadow(value: MotionValue<number>) {
	const boxShadow = useMotionValue(inactiveShadow);

	useEffect(() => {
		let isActive = false;
		value.onChange((latest) => {
			const wasActive = isActive;
			if (latest !== 0) {
				isActive = true;
				if (isActive !== wasActive) {
					animate(boxShadow, '0px 0px 5px rgba(0,0,0,0.2)', {duration: 0, delay: 0});
				}
			} else {
				isActive = false;
				if (isActive !== wasActive) {
					animate(boxShadow, inactiveShadow, {duration: 0, delay: 0});
				}
			}
		});
	}, [value, boxShadow]);

	return boxShadow;
}
