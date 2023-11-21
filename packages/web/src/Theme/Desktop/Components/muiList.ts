import {Components, Theme} from '@mui/material/styles';

const muiList: Components<Theme>['MuiList'] = {
	styleOverrides: {
		root: {
			'.MuiDivider-root': {
				margin: 0,
			},
		},
	},
};

export default muiList;
