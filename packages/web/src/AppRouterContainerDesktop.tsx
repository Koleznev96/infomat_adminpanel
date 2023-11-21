import React from 'react';

import Information from 'src/Components/Information/Information';
import RouterDesktop from 'src/Routes/RouterDesktop';
import AppRouter from 'src/AppRouter';

const AppRouterContainerDesktop = () => {
	// const isLoggedIn = useStoreSelector(selectIsLoggedIn);
	const isLoggedIn = true;

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
