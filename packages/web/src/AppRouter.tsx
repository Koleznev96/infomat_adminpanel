import React, {useEffect} from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import * as moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';
// import selectIsClientReady from '@infomat/core/src/Redux/Client/Selectors/selectIsClientReady';
import ActionCreator from '@infomat/core/src/Actions/Client/ActionCreator';

import sagaRunner from 'src/Redux/sagaRunner';
import {createSagaContext} from 'src/Redux/sagaContext';

// setup duration format
momentDurationFormatSetup(moment);

const AppRouter = ({router}: TAppRouterProps) => {
	// const isClientReady = useStoreSelector(selectIsClientReady);
	const dispatch = useDispatch();

	useEffect(() => {
		sagaRunner.setContext(createSagaContext(router));
		dispatch(ActionCreator.clientReady());
	}, [dispatch, router]);

	// return isClientReady ? <RouterProvider router={router} /> : null;
	return <RouterProvider router={router} />;
};

type TAppRouterProps = {
	router: ReturnType<typeof createBrowserRouter>;
};

export default AppRouter;
