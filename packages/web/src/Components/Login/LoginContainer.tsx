import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {useLocation} from 'react-router';
import _ from 'lodash';

import LoginDesktop from './Desktop/LoginDesktop';

const LoginContainer = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const searchParams = new URLSearchParams(location.search);

	const onLogin = useCallback((modelName: string, password: string) => console.log('dfds'), [dispatch]);

	// if (isLoggedIn) {
	// 	return <Navigate to={{pathname: Routes.chatsAll, search: searchParams.toString()}} />;
	// }

	// return isAutoLoginRequired || (_.isUndefined(isLoggedIn) && !isLoginSent) ? (
	// 	<Spinner />
	// ) : (
	// 	<DeviceBasedComponentSwitcher desktop={LoginDesktop} props={{onLogin}} />
	// );

	return <LoginDesktop onLogin={onLogin} />;
};

export default LoginContainer;
