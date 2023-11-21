import {Components, Theme} from '@mui/material/styles';

import ServiceFactory from '@infomat/core/src/Services/ServiceFactory';

const muiModal: Components<Theme>['MuiModal'] = {
	defaultProps: {
		container: () => ServiceFactory.uiContainer.getApplicationContainer(),
	},
};

export default muiModal;
