import React, {lazy, Suspense} from 'react';
import HttpsRedirect from 'react-https-redirect';
import {Provider} from 'react-redux';
import {CssBaseline, Container} from '@mui/material';

import ServiceFactory from '@infomat/core/src/Services/ServiceFactory';
import Spinner from '@infomat/uikit/src/Spinner/Spinner';

import GlobalErrorBoundary from 'src/Components/Error/GlobalErrorBoundary';
import store from 'src/Redux/store';
import 'src/Redux/sagaRunner';
// import WithDesktopTheme from './Theme/WithDesktopTheme';
// import AppRouterContainerDesktop from './AppRouterContainerDesktop';

const WithDesktopTheme = lazy(() => import('src/Theme/WithDesktopTheme'));
const AppRouterContainerDesktop = lazy(() => import('src/AppRouterContainerDesktop'));

const App = () => (
	<HttpsRedirect disabled={ServiceFactory.env.notProduction()}>
		<Suspense fallback={<Spinner isGlobal />}>
			<WithDesktopTheme>
				<CssBaseline />
				<Provider store={store}>
					<Container className="app-container">
						<GlobalErrorBoundary>
							<AppRouterContainerDesktop />
						</GlobalErrorBoundary>
					</Container>
				</Provider>
			</WithDesktopTheme>
		</Suspense>
	</HttpsRedirect>
);

export default App;
