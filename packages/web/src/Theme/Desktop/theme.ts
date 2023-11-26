import {experimental_extendTheme as extendTheme, ThemeOptions} from '@mui/material/styles';
import 'react-perfect-scrollbar/dist/css/styles.css';
import _ from 'lodash';
import {Breakpoint} from '@mui/system/createTheme/createBreakpoints';

import breakpoints from '@infomat/uikit/src/breakpoints.module.scss';

import muiAlert from 'src/Theme/Desktop/Components/muiAlert';
import muiTooltip from 'src/Theme/Desktop/Components/muiTooltip';
import muiBadge from 'src/Theme/Components/muiBadge';

import muiButton from './Components/muiButton';
import muiTextField from './Components/muiTextField';
import muiToggleButton from './Components/muiToggleButton';
import muiTabs from './Components/muiTabs';
import muiTab from './Components/muiTab';
import muiMobileStepper from './Components/muiMobileStepper';
import muiTableCell from './Components/muiTableCell';
import muiChip from './Components/muiChip';
import muiDialog from './Components/muiDialog';
import muiList from './Components/muiList';
import muiSlider from './Components/muiSlider';
import muiMenuItem from './Components/muiMenuItem';
import muiTypography from './Components/muiTypography';
import shadows from './shadows';
import palette from './palette';

import './theme.scss';

/**
 * @link https://github.com/mui-org/material-ui/blob/v0.x/src/styles/getMuiTheme.js
 */
const commonTheme: ThemeOptions = {
	gradient: (gradient?: {start: string; end: string}) =>
		gradient ? `linear-gradient(90deg, ${gradient.start} 0%, ${gradient.end} 100%)` : 'none',
	typography: {
		fontSize: 13,
		fontFamily: 'Manrope',
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				'@global': {
					'@fontFace': 'Manrope',
				},
			},
		},

		MuiButton: muiButton,
		MuiToggleButton: muiToggleButton,

		MuiTabs: muiTabs,
		MuiTab: muiTab,

		MuiMobileStepper: muiMobileStepper,
		MuiTableCell: muiTableCell,
		MuiChip: muiChip,
		MuiBadge: muiBadge,

		MuiDialog: muiDialog,
		MuiAlert: muiAlert,
		MuiTooltip: muiTooltip,
		MuiList: muiList,
		MuiMenuItem: muiMenuItem,
		MuiSlider: muiSlider,
		MuiTypography: muiTypography,

		MuiTextField: muiTextField,
	},

	palette: palette,
	shadows: shadows,
	breakpoints: {
		values: _.mapValues(breakpoints, Number) as {[key in Breakpoint]: number},
	},
	zIndex: {
		snackbar: 1200,
	},
};

const theme = extendTheme(commonTheme);

const darkConfig = {
	...commonTheme,
	palette: {
		...palette,
		mode: 'dark',
	},
};

export const darkTheme = extendTheme(darkConfig);

export default theme;
