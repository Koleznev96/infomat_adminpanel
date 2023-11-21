import {Components, Theme} from '@mui/material/styles';

const muiDialog: Components<Theme>['MuiDialog'] = {
	styleOverrides: {
		paper: ({theme}) => ({
			[theme.breakpoints.up('sm')]: {
				borderRadius: theme.typography.pxToRem(24),
			},
		}),
	},
};

export default muiDialog;
