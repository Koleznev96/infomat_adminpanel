import {Components, Theme} from '@mui/material/styles';

const muiMenuItem: Components<Theme>['MuiMenuItem'] = {
	styleOverrides: {
		root: {
			'&+.MuiDivider-root': {
				margin: 0,
			},
		},
	},
};

export default muiMenuItem;
