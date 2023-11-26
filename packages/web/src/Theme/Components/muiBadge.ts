import {alpha, Components, Theme} from '@mui/material/styles';
import {BadgeOrigin} from '@mui/material/Badge/Badge';

export const anchorOriginLeftBottom: BadgeOrigin = {vertical: 'bottom', horizontal: 'left'};

const muiBadge: Components<Theme>['MuiBadge'] = {
	styleOverrides: {
		invisible: {
			display: 'none',
		},
	},
	variants: [
		{
			props: {variant: 'online-status'},
			style: ({theme}) => ({
				'.MuiBadge-badge': {
					backgroundColor: theme.palette.success.main,
					color: theme.palette.success.main,
					borderColor: theme.palette.common.white,
					borderWidth: 2,
					borderStyle: 'solid',
					width: theme.spacing(1.5),
					height: theme.spacing(1.5),
					minWidth: theme.spacing(1.5),
					borderRadius: '50%',
					padding: 0,
				},
			}),
		},
		{
			props: {variant: 'new-message'},
			style: ({theme}) => ({
				'> .MuiBadge-badge': {
					backgroundColor: theme.palette.primary.main,
					color: theme.palette.primary.main,
					width: theme.spacing(),
					height: theme.spacing(),
					minWidth: theme.spacing(),
					padding: 0,
				},
			}),
		},
		{
			props: {variant: 'new-chat'},
			style: ({theme}) => ({
				'@keyframes ripple': {
					'0%': {
						transform: 'scale(.8)',
						opacity: 1,
					},
					'100%': {
						transform: 'scale(3.4)',
						opacity: 0,
					},
				},
				'> .MuiBadge-badge': {
					boxShadow: `0 0 0 ${theme.spacing(0.5)} ${alpha(theme.palette.primary.main, 0.27)}`,
					width: theme.spacing(0.5),
					minWidth: theme.spacing(0.5),
					height: theme.spacing(0.5),
					backgroundColor: theme.palette.primary.main,
					color: theme.palette.primary.main,
					padding: 0,

					'&::after': {
						position: 'absolute',
						width: '100%',
						height: '100%',
						borderRadius: '50%',
						animation: 'ripple 1.2s infinite ease-in-out',
						border: '1px solid currentColor',
						content: '""',
					},
				},
			}),
		},
		{
			props: {variant: 'unseen-count'},
			style: ({theme}) => ({
				'> .MuiBadge-badge': {
					backgroundColor: theme.palette.primary.main,
					color: theme.palette.common.white,
					borderRadius: 99,
					fontSize: theme.typography.pxToRem(10),
					lineHeight: theme.typography.pxToRem(10),
					minWidth: theme.typography.pxToRem(10),
					padding: `0 ${theme.typography.pxToRem(2)}`,
					height: theme.typography.pxToRem(10),
					top: theme.typography.pxToRem(2),
					right: theme.typography.pxToRem(2),
				},
			}),
		},
		{
			props: {variant: 'dot'},
			style: ({theme}) => ({
				'.MuiBadge-badge': {
					backgroundColor: theme.palette.primary.main,
					width: theme.spacing(),
					height: theme.spacing(),
					minWidth: theme.spacing(),
				},
			}),
		},
		{
			props: {anchorOrigin: anchorOriginLeftBottom},
			style: ({theme}) => ({
				'.MuiBadge-badge': {
					bottom: theme.spacing(0.75),
					left: theme.spacing(0.5),
				},
			}),
		},
	],
};

export default muiBadge;
