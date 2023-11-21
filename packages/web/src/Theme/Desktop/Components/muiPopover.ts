import {Components, Theme} from '@mui/material/styles';

import ServiceFactory from '@infomat/core/src/Services/ServiceFactory';

const muiPopover: Components<Theme>['MuiPopover'] = {
	defaultProps: {
		container: () => ServiceFactory.uiContainer.getApplicationContainer(),
	},
	styleOverrides: {
		root: {
			userSelect: 'none',
			WebkitTouchCallout: 'none',
		},
	},
};

export default muiPopover;
