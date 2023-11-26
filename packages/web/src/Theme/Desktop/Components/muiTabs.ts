import {Components, Theme} from '@mui/material/styles';

const muiTabs: Components<Theme>['MuiTabs'] = {
	styleOverrides: {
		indicator: ({theme}) => ({
			backgroundColor: theme.palette.secondary.main,
		}),
	},
};

export default muiTabs;
