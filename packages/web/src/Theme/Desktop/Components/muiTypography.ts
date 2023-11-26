import {Components, Theme} from '@mui/material/styles';

const muiTypography: Components<Theme>['MuiTypography'] = {
	styleOverrides: {
		body3: ({theme}) => ({
			display: 'block',
			fontSize: theme.typography.pxToRem(14),
			lineHeight: theme.typography.pxToRem(21),
		}),
	},
};

export default muiTypography;
