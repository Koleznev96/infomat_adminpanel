import {Components, Theme} from '@mui/material/styles';

const muiTextField: Components<Theme>['MuiTextField'] = {
	styleOverrides: {
		root: ({theme}) => ({
			'.MuiInputBase-root': {
				'.MuiOutlinedInput-notchedOutline': {
					borderRadius: 6,
					borderWidth: 1,
					borderColor: theme.palette.divider,
				},

				'&.Mui-focused': {
					'.MuiOutlinedInput-notchedOutline': {
						borderWidth: 2,
						borderColor: theme.palette.text.disabled,
					},
				},

				'&.MuiInputBase-multiline': {
					padding: '4px 6px 4px 0',
					'.MuiInputBase-input': {
						padding: '4px 12px',
					},
				},

				'.MuiInputBase-input': {
					padding: '8px 12px',

					'&::placeholder': {
						color: theme.palette.text.disabled,
					},
				},
			},
		}),
	},
};

export default muiTextField;
