import {Theme} from '@mui/material/styles';

import {getAvatarColorsConfigById} from '@infomat/core/src/Utils/AvatarColors/getAvatarColorsConfigById';

export const getAvatarStyles = (id?: string) => {
	const colorsConfig = getAvatarColorsConfigById(id);

	return (theme: Theme) => ({
		backgroundColor: colorsConfig.backgroundColor,
		color: colorsConfig.isBright ? theme.palette.text.secondary : theme.palette.common.white,
	});
};
