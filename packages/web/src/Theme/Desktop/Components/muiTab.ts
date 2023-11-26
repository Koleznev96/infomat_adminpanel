import {Components, Theme} from '@mui/material/styles';

const muiTab: Components<Theme>['MuiTab'] = {
	styleOverrides: {
		root: ({theme}) => ({
			minWidth: 160,
			color: theme.palette.text.secondary,
			opacity: 0.7,
			'&.Mui-selected': {
				color: theme.palette.text.primary,
			},
			//NavLink tab
			'&.active': {
				color: theme.palette.text.primary,
				borderBottom: `2px solid ${theme.palette.secondary.main}`,
			},
		}),
	},
};

export default muiTab;
