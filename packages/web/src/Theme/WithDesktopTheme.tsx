import React, {ReactNode} from 'react';
import {StyledEngineProvider, Experimental_CssVarsProvider as CssVarsProvider} from '@mui/material';
import {Helmet} from 'react-helmet';

import themes from '@infomat/uikit/src/theme.module.scss';

import theme, {darkTheme} from 'src/Theme/Desktop/theme';

const WithDesktopTheme = ({children, isDark}: {children?: ReactNode; isDark?: boolean}) => (
	<StyledEngineProvider injectFirst>
		{/* eslint-disable-next-line css-modules/no-undef-class */}
		<Helmet htmlAttributes={{'data-theme': themes.desktop}} />
		<CssVarsProvider theme={isDark ? darkTheme : theme}>{children}</CssVarsProvider>
	</StyledEngineProvider>
);
export default WithDesktopTheme;
