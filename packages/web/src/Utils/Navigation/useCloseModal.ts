import {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import {useLocation} from 'react-router';

import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';

import {getCloseModalRoute} from 'src/Utils/Navigation/getCloseModalRoute';

export function useCloseModal(onClose?: PropertyHandler) {
	const navigate = useNavigate();
	const location = useLocation();

	return useCallback(() => {
		navigate(getCloseModalRoute(location.pathname), {relative: 'path'});

		if (onClose) {
			onClose();
		}
	}, [navigate, location, onClose]);
}
