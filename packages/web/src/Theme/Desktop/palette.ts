import {PaletteOptions} from '@mui/material/styles';

const VxLivePalette: PaletteOptions = {
	background: {
		default: '#fff', //--mui-palette-background-default+
	},
	primary: {
		main: '#94A3B8', //--mui-palette-primary-main
		gradient: {
			start: '#E2E8F0', //--mui-palette-primary-gradient-start+
			end: '#F1F5F9', //--mui-palette-primary-gradient-end+
		},
	},
	secondary: {
		main: '#333', //--mui-palette-secondary-main+
		dark: '#484848', //--mui-palette-secondary-dark+
		light: '#878B94', //--mui-palette-secondary-light+
	},
	light: {
		main: '#FFFFFF', //--mui-palette-light-main
		light: '#AAAAAA', //--mui-palette-light-light
		dark: '#222222', //--mui-palette-light-dark
	},

	error: {
		main: '#FF4D3B', //--mui-palette-error-main
		gradient: {
			start: '#df5f38',
			end: '#e82424',
		},
	},
	success: {
		main: '#7bdf3e', //--mui-palette-success-main
		gradient: {
			start: '#7bdf3e',
			end: '#99df3e',
		},
	},
	info: {
		main: '#567c98', //--mui-palette-info-main
		dark: '#204fd4', //--mui-palette-info-dark
		light: '#3d94ed', //--mui-palette-info-light
	},
	common: {
		black: '#000000', //--mui-palette-common-black
		white: '#ffffff', //--mui-palette-common-white
	},
	text: {
		primary: '#0F172A', //--mui-palette-text-primary+
		secondary: '#475569', //--mui-palette-text-secondary+
		disabled: '#94A3B8', //--mui-palette-text-disabled+
	},
	divider: '#CBD5E1', //--mui-palette-divider+

	slate: {
		900: '#0F172A', //--mui-palette-slate-900
		700: '#334155', //--mui-palette-slate-700
		300: '#CBD5E1', //--mui-palette-slate-300
		200: '#E2E8F0', //--mui-palette-slate-200
	},
	title: '#101828', //--mui-palette-title
	action: {
		active: '#222222',
	},
};

export default VxLivePalette;
