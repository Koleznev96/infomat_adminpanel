import '@mui/material/styles/createPalette';
import '@mui/material/styles/createTheme';
import '@mui/material/Button';
import '@mui/material/Badge';
import '@mui/material/Alert';

type TGradientType = {start: string; end: string};
type TShadowsType = {
	header: string;
	toolbar: string;
	login: string;
	customers: string;
	tooltip: string;
	streamOverlay: string;
};

declare module '@mui/material/styles/createPalette' {
	interface PaletteColor {
		gradient?: TGradientType;
	}

	interface SimplePaletteColorOptions {
		gradient?: TGradientType;
	}

	interface PaletteOptions {
		chat?: {
			private: string;
			admin: string;
			voyeur: string;
			group: string;
			message: {
				guest: {
					background: string;
				};
				model: {
					background: string;
				};
				system: {
					background: string;
				};
			};
			media: {
				preview: {
					backdrop: string;
				};
			};
		};
		light?: PaletteColorOptions;
		dark?: PaletteColorOptions;
		steel?: PaletteColorOptions;
		shadows?: TShadowsType;
		title?: string;
		slate?: {
			900: string;
			700: string;
			300: string;
			200: string;
		};
	}

	interface Palette {
		light?: PaletteColor;
		dark?: PaletteColor;
		steel?: PaletteColor;
	}
}

declare module '@mui/material/styles/createTheme' {
	interface ThemeOptions {
		gradient: (gradient?: TGradientType) => string;
	}

	interface Theme {
		gradient: (gradient?: TGradientType) => string;
	}
}

declare module '@mui/material/Button' {
	interface ButtonPropsSizeOverrides {
		huge: true;
	}

	interface ButtonPropsColorOverrides {
		light: true;
	}

	interface ButtonClasses {
		sizeHuge: string;
		outlinedSizeHuge: string;
		textLight: string;
	}
}

declare module '@mui/material/ToggleButton' {
	interface ToggleButtonPropsSizeOverrides {
		tiny: true;
		huge: true;
	}
}

declare module '@mui/material/Checkbox' {
	interface CheckboxPropsSizeOverrides {
		tiny: true;
	}
}

declare module '@mui/material/Badge' {
	interface BadgePropsVariantOverrides {
		'online-status': true;
		'new-message': true;
		'new-chat': true;
		'unseen-count': true;
	}
}

declare module '@mui/material/Chip' {
	interface ChipPropsVariantOverrides {
		success: true;
		price: true;
		dark: true;
	}

	interface ChipPropsSizeOverrides {
		large: true;
	}

	interface ChipClasses {
		success: true;
		price: true;
		dark: true;
		sizeLarge: true;
	}
}

declare module '@mui/material/Alert' {
	interface AlertPropsColorOverrides {
		dark: true;
	}

	interface AlertClasses {
		standardDark: string;
	}
}

declare module '@mui/material/Typography' {
	interface TypographyPropsVariantOverrides {
		body3: true;
	}

	interface TypographyClasses {
		body3: string;
	}
}
