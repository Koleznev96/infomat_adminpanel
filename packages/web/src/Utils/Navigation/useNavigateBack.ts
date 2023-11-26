import {useCallback, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useLocation} from 'react-router';

import {Routes} from 'src/Routes/Routes';

export enum EnumNavigateBackVariants {
	HISTORY_BACK,
	ROUTE_UP,
}

export function useNavigateBack(
	browser: {getHistoryLength: () => number},
	to: EnumNavigateBackVariants | string = EnumNavigateBackVariants.HISTORY_BACK,
) {
	const navigate = useNavigate();
	const location = useLocation();
	const [previousLocation] = useState(location.state?.previousLocation);

	return useCallback(() => {
		if (previousLocation) {
			navigate(previousLocation);
		} else if (browser.getHistoryLength() === 2) {
			navigate(Routes.home, {replace: true});
		} else if (to === EnumNavigateBackVariants.HISTORY_BACK) {
			navigate(-1);
		} else if (to === EnumNavigateBackVariants.ROUTE_UP) {
			navigate('..');
		} else {
			navigate(to);
		}
	}, [browser, navigate, previousLocation, to]);
}
