import React, {ForwardedRef, forwardRef} from 'react';
import {IconButton} from '@mui/material';

import {TIconButtonProps} from '@infomat/uikit/src/IconButton/types';
import {Icon} from '@infomat/uikit/src/Icon';

import style from './SecondaryIconButton.module.scss';

const SecondaryIconButton = forwardRef(
	({iconType, iconSize, iconColor, children, ...restProps}: TIconButtonProps, ref: ForwardedRef<HTMLButtonElement>) => (
		<IconButton {...restProps} ref={ref} className={style.secondaryIconButton}>
			{iconType && <Icon type={iconType} size={iconSize} color={iconColor} />}
			{children}
		</IconButton>
	),
);

export default SecondaryIconButton;
