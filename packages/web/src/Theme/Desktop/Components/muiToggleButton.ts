import {Components, Theme} from '@mui/material/styles';

const muiToggleButton: Components<Theme>['MuiToggleButton'] = {
	styleOverrides: {
		root: ({theme}) => ({
			borderRadius: 16,
			padding: '6px 20px',
			color: theme.palette.text.primary,
			textTransform: 'capitalize',
			lineHeight: 'normal',

			svg: {
				color: theme.palette.text.secondary,
				marginRight: 4,
			},
			'&:hover': {
				background: 'transparent',
			},
			'&.Mui-selected': {
				background: 'transparent',
				color: theme.palette.primary.main,
				borderColor: theme.palette.primary.main,
				svg: {
					color: theme.palette.primary.main,
				},
				'&:hover': {
					background: 'transparent',
				},
			},
		}),

		sizeSmall: {
			padding: '4px 8px',
			minWidth: 'auto',
		},
	},
	variants: [
		{
			props: {size: 'tiny'},
			style: ({theme}) => ({
				padding: '2px 8px',
				minWidth: 'auto',
				'&.Mui-selected': {
					fontWeight: 'bold',
				},
			}),
		},
	],
};

export default muiToggleButton;
