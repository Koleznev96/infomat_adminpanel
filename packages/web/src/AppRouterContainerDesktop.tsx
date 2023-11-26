import React from 'react';

import {selectIsLoggedIn} from '@infomat/core/src/Redux/User/Selectors/selectIsLoggedIn';
import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';

import Information from 'src/Components/Information/Information';
import RouterDesktop from 'src/Routes/RouterDesktop';
import AppRouter from 'src/AppRouter';

const AppRouterContainerDesktop = () => {
	const isLoggedIn = useStoreSelector(selectIsLoggedIn);

	return (
		<>
			{isLoggedIn && <Information />}
			<div className="content-container">
				<AppRouter router={RouterDesktop} />
			</div>
		</>
	);
};

export default AppRouterContainerDesktop;
