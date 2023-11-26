import {Components, Theme} from '@mui/material/styles';

const muiTooltip: Components<Theme>['MuiTooltip'] = {
	styleOverrides: {
		//do not show tooltip on tooltip body hovering
		popper: {
			pointerEvents: 'none',
		},
	},
};

export default muiTooltip;
