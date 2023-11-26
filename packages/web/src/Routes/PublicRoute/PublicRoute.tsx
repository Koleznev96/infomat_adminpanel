import {Navigate, Outlet} from 'react-router-dom';
import React, {Suspense} from 'react';
import {useLocation} from 'react-router';

import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';
import {selectIsLoggedIn} from '@infomat/core/src/Redux/User/Selectors/selectIsLoggedIn';
import Spinner from '@infomat/uikit/src/Spinner/Spinner';

import {Routes} from 'src/Routes/Routes';
import PageContainerDesktop from 'src/Routes/PageContainer/PageContainerDesktop';

const PublicRoute = ({startPath = Routes.information}: TPublicRouteProps) => {
	const isLoggedIn = useStoreSelector(selectIsLoggedIn);
	const {state} = useLocation();

	if (isLoggedIn) {
		return <Navigate to={state?.location || startPath} replace />;
	}

	return (
		<PageContainerDesktop>
			<Suspense fallback={<Spinner isGlobal />}>
				<Outlet />
			</Suspense>
		</PageContainerDesktop>
	);
};

type TPublicRouteProps = {
	startPath?: string;
};

export default PublicRoute;
