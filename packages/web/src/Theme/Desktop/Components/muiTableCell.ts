import {Components, Theme} from '@mui/material/styles';

const muiTableCell: Components<Theme>['MuiTableCell'] = {
	styleOverrides: {
		head: ({theme}) => ({
			fontWeight: 'bold',
			borderColor: theme.palette.secondary.main,
			padding: 4,
		}),
		body: ({theme}) => ({
			borderColor: theme.palette.secondary.main,
			padding: 8,
		}),
	},
};

export default muiTableCell;
