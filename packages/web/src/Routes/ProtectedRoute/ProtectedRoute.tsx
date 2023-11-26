import React, {FC, Suspense} from 'react';
import {Navigate} from 'react-router';

import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';
import Spinner from '@infomat/uikit/src/Spinner/Spinner';
import {selectIsLoggedIn} from '@infomat/core/src/Redux/User/Selectors/selectIsLoggedIn';

import {Routes} from 'src/Routes/Routes';
import PageContainerDesktop from 'src/Routes/PageContainer/PageContainerDesktop';

const ProtectedRoute = ({Comp}: {Comp?: FC}) => {
	const isLoggedIn = useStoreSelector(selectIsLoggedIn);

	if (!isLoggedIn) {
		return <Navigate to={Routes.home} state={{location: undefined}} replace />;
	}

	return (
		<PageContainerDesktop>
			<Suspense fallback={<Spinner isGlobal />}>{Comp && <Comp />}</Suspense>
		</PageContainerDesktop>
	);
};

export default ProtectedRoute;
