import {IconButtonProps} from '@mui/material/IconButton';
import {ElementType} from 'react';

import {IconColor, IconSize, IconType} from '@infomat/uikit/src/Icon';

export type TSelectedIconButtonProps = Pick<
	IconButtonProps,
	| 'onClick'
	| 'onMouseDown'
	| 'disabled'
	| 'children'
	| 'className'
	| 'disableRipple'
	| 'disableFocusRipple'
	| 'disableTouchRipple'
	| 'onTouchEnd'
	| 'size'
>;

export type TIconButtonProps = TSelectedIconButtonProps & {
	iconType?: IconType;
	iconSize?: IconSize;
	iconColor?: IconColor;
	component?: ElementType;
};
