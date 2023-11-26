import React, {useEffect} from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import ActionCreator from '@infomat/core/src/Actions/Client/ActionCreator';

import sagaRunner from 'src/Redux/sagaRunner';
import {createSagaContext} from 'src/Redux/sagaContext';

const AppRouter = ({router}: TAppRouterProps) => {
	const dispatch = useDispatch();

	useEffect(() => {
		sagaRunner.setContext(createSagaContext(router));
		dispatch(ActionCreator.clientReady());
	}, [dispatch, router]);

	return <RouterProvider router={router} />;
};

type TAppRouterProps = {
	router: ReturnType<typeof createBrowserRouter>;
};

export default AppRouter;
