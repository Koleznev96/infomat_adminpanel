import {Components, Theme} from '@mui/material/styles';

const muiAlert: Components<Theme>['MuiAlert'] = {
	styleOverrides: {
		root: ({theme}) => ({
			borderRadius: theme.typography.pxToRem(24),
		}),
	},
};

export default muiAlert;
