import {Outlet, useSearchParams} from 'react-router-dom';
import React, {FC, Suspense} from 'react';
import {Navigate, useLocation} from 'react-router';
import _ from 'lodash';

import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';
import Spinner from '@infomat/uikit/src/Spinner/Spinner';

import PageContainerDesktop from 'src/Routes/PageContainer/PageContainerDesktop';
import {Routes} from 'src/Routes/Routes';
import DeviceBasedComponentSwitcher from 'src/Components/DeviceBasedComponentSwitcher/DeviceBasedComponentSwitcher';

const ProtectedRoute = ({Comp}: {Comp?: FC}) => {
	// const isLoggedIn = useStoreSelector(selectIsLoggedIn);
	const location = useLocation();
	const [searchParams] = useSearchParams();

	// if (!isLoggedIn) {
	// 	if (searchParams.get('foreignSID')) {
	// 		searchParams.delete('foreignSID');
	// 		location.search = `?${searchParams.toString()}`;
	// 	}

	// 	return (
	// 		<Navigate
	// 			to={Routes.home}
	// 			state={{location: !Routes.isModal(location.pathname) ? location : undefined}}
	// 			replace
	// 		/>
	// 	);
	// }

	return (
		<DeviceBasedComponentSwitcher desktop={PageContainerDesktop}>
			<Suspense fallback={<Spinner isGlobal />}>
				{Comp && <Comp />}
				{/* <Outlet /> */}
			</Suspense>
		</DeviceBasedComponentSwitcher>
	);
};

export default ProtectedRoute;
