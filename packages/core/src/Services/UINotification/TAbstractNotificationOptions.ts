import {TransitionHandler, TransitionEnterHandler} from 'notistack';
import React from 'react';
import {AlertPropsColorOverrides, AlertColor} from '@mui/material/Alert/Alert';
import {OverridableStringUnion} from '@mui/types';

import {
	EnumAbstractNotificationVariant,
	EnumAbstractNotificationPositionVertical,
	EnumAbstractNotificationPositionHorizontal,
	EnumAbstractNotificationCloseReason,
} from '@messenger/core/src/Services/UINotification';
import {EnumAbstractNotificationButtonStyle} from '@messenger/core/src/Services/UINotification/EnumAbstractNotificationButtonStyle';

export type TAbstractNotificationOptions = {
	notificationTitle?: string;
	text: string;
	variant?: EnumAbstractNotificationVariant;
	duration?: number | null;
	buttonText?: string;
	buttonStyle?: EnumAbstractNotificationButtonStyle;
	key: string;
	position?: {
		vertical: EnumAbstractNotificationPositionVertical;
		horizontal: EnumAbstractNotificationPositionHorizontal;
	};
	content?: React.ReactNode;
	buttonRoute?: string;
	onClose?: (
		event: React.SyntheticEvent<any> | null,
		reason: EnumAbstractNotificationCloseReason,
		key?: string,
	) => void;
	persist?: boolean;
	onExit?: TransitionHandler;
	onEnter?: TransitionHandler;
	onEntering?: TransitionHandler;
	onEntered?: TransitionEnterHandler;
	onExiting?: TransitionHandler;
	onExited?: TransitionHandler;
	color?: OverridableStringUnion<AlertColor, AlertPropsColorOverrides>;
	isOnlyMobile?: boolean;
	isPositionBottom?: boolean;
};
