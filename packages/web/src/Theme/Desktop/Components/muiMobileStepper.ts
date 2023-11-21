import {Components, Theme} from '@mui/material/styles';

const muiMobileStepper: Components<Theme>['MuiMobileStepper'] = {
	styleOverrides: {
		root: {
			background: 'transparent',
		},
	},
};

export default muiMobileStepper;
