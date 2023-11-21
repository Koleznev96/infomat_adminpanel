import {Components, Theme} from '@mui/material/styles';

const muiButton: Components<Theme>['MuiButton'] = {
	styleOverrides: {
		root: ({theme}) => ({
			borderRadius: 6,
			padding: `8px 16px`,
			color: theme.palette.common.white,
			fontWeight: 500,
			fontSize: theme.typography.pxToRem(14),

			'&:hover': {
				background: '#F1F5F9',
				borderWidth: 1,
				borderColor: '#E2E8F0',
			},

			'&.Mui-startIcon': {
				padding: `8px 16px 8px 10px`,
			},

			'&.Mui-iconOnly': {
				padding: 0,
				'.MuiButton-endIcon': {
					margin: 0,
				},
				width: theme.typography.pxToRem(36),
				maxWidth: theme.typography.pxToRem(36),
				minWidth: theme.typography.pxToRem(36),
				height: theme.typography.pxToRem(36),
				boxShadow: '0px 2px 6px 0px rgba(0, 0, 0, 0.06)',
				margin: '0px 4px',

				'&.Mui-disabled': {
					boxShadow: 'none',
				},
			},

			// '&:hover': {
			// 	opacity: 0.9,
			// },
		}),
		contained: ({theme}) => ({
			color: theme.palette.common.white,
			background: theme.palette.secondary.main,

			'&:hover': {
				background: theme.palette.secondary.dark,
			},

			boxShadow: 'none',
			'&:active': {
				boxShadow: 'none',
			},

			'&.Mui-disabled': {
				color: theme.palette.common.white,
				background: theme.palette.secondary.light,
			},
		}),
		outlined: ({theme}) => ({
			color: theme.palette.text.primary,
			textTransform: 'capitalize',
			borderWidth: 1,
			borderColor: '#E2E8F0',
			fontSize: theme.typography.pxToRem(14),
			fontWeight: '500',
			// padding: `4px 16px`,

			'&:hover': {
				background: '#F1F5F9',
				borderWidth: 1,
				borderColor: '#E2E8F0',
			},
		}),
		// sizeMedium: ({theme}) => ({
		// 	lineHeight: 'normal',
		// 	minWidth: theme.typography.pxToRem(32),
		// 	'&.Mui-iconOnly': {
		// 		padding: 0,
		// 		'.MuiButton-endIcon': {
		// 			margin: 0,
		// 		},
		// 		width: theme.typography.pxToRem(32),
		// 		height: theme.typography.pxToRem(32),
		// 	},
		// }),
		// sizeLarge: ({theme}) => ({
		// 	fontSize: theme.typography.pxToRem(16),
		// 	borderRadius: theme.typography.pxToRem(20),
		// }),
		// textPrimary: ({theme}) => ({
		// 	color: theme.palette.primary.main,
		// 	'&:hover': {
		// 		color: theme.palette.primary.light,
		// 		background: 'none',
		// 	},
		// }),
		// textSecondary: ({theme}) => ({
		// 	color: theme.palette.text.primary,
		// 	'&:hover': {
		// 		color: theme.palette.primary.main,
		// 		background: 'none',
		// 	},
		// }),

		// containedPrimary: ({theme}) => ({
		// 	background: theme.gradient(theme.palette.primary.gradient),
		// 	'&:hover': {
		// 		background: theme.gradient({
		// 			start: theme.palette.primary.main,
		// 			end: theme.palette.primary.main,
		// 		}),
		// 	},
		// 	'&.Mui-disabled': {
		// 		color: theme.palette.common.white,
		// 		background: theme.palette.secondary.main,
		// 	},
		// }),
		// containedSuccess: ({theme}) => ({
		// 	border: 0,
		// 	fontWeight: 'normal',
		// 	boxShadow: 'none',
		// 	background: theme.gradient(theme.palette.success.gradient),
		// 	'&:hover': {
		// 		background: theme.gradient({
		// 			start: theme.palette.success.main,
		// 			end: theme.palette.success.main,
		// 		}),
		// 	},
		// 	'&.Mui-disabled': {
		// 		color: theme.palette.common.white,
		// 		background: theme.gradient({
		// 			start: theme.palette.secondary.main,
		// 			end: theme.palette.secondary.main,
		// 		}),
		// 	},
		// }),
		// containedError: ({theme}) => ({
		// 	border: 0,
		// 	fontWeight: 'normal',
		// 	boxShadow: 'none',
		// 	background: theme.gradient(theme.palette.error.gradient),
		// 	'&:hover': {
		// 		background: theme.gradient({
		// 			start: theme.palette.error.main,
		// 			end: theme.palette.error.main,
		// 		}),
		// 	},
		// 	'&.Mui-disabled': {
		// 		color: theme.palette.common.white,
		// 		background: theme.gradient({
		// 			start: theme.palette.secondary.main,
		// 			end: theme.palette.secondary.main,
		// 		}),
		// 	},
		// }),
	},
};

export default muiButton;
