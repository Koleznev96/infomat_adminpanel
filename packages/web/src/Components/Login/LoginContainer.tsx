import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {Navigate} from 'react-router';
import _ from 'lodash';

import {userClientToServerActions} from '@infomat/core/src/Redux/User/Actions/userClientToServerActions';
import {selectIsNetworkAvailable} from '@infomat/core/src/Redux/User/Selectors/selectIsNetworkAvailable';
import {selectIsLoggedIn} from '@infomat/core/src/Redux/User/Selectors/selectIsLoggedIn';
import {selectErrorLogin} from '@infomat/core/src/Redux/User/Selectors/selectErrorLogin';
import {selectIsLoading} from '@infomat/core/src/Redux/User/Selectors/selectIsLoading';
import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';
import Spinner from '@infomat/uikit/src/Spinner/Spinner';

import {Routes} from 'src/Routes/Routes';

import LoginDesktop from './Desktop/LoginDesktop';

const LoginContainer = () => {
	const dispatch = useDispatch();

	const isNetworkAvailable = useStoreSelector(selectIsNetworkAvailable);
	const isLoggedIn = useStoreSelector(selectIsLoggedIn);
	const isLoading = useStoreSelector(selectIsLoading);
	const error = useStoreSelector(selectErrorLogin);

	const onLogin = useCallback(
		(login: string, password: string) => dispatch(userClientToServerActions.login({login, password})),
		[dispatch],
	);

	if (isLoggedIn) {
		return <Navigate to={{pathname: Routes.information}} />;
	}

	return isLoading ? (
		<Spinner />
	) : (
		<LoginDesktop error={error} isLoggingIn={isLoggedIn} isNetworkAvailable={isNetworkAvailable} onLogin={onLogin} />
	);
};

export default LoginContainer;
