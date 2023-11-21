import {alpha, Components, Theme} from '@mui/material/styles';

const muiChip: Components<Theme>['MuiChip'] = {
	styleOverrides: {
		colorSecondary: ({theme}) => ({
			color: theme.palette.text.primary,
			borderColor: alpha(theme.palette.text.primary, theme.palette.action.disabledOpacity),
		}),
	},
};

export default muiChip;
