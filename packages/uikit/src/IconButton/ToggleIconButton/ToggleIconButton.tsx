import React, {ForwardedRef, forwardRef} from 'react';
import {IconButton} from '@mui/material';
import classNames from 'classnames';

import {TIconButtonProps} from '@infomat/uikit/src/IconButton/types';
import {Icon} from '@infomat/uikit/src/Icon';

import style from './ToggleIconButton.module.scss';

const ToggleIconButton = forwardRef(
	(
		{iconType, iconSize, iconColor, selected = false, children, ...restProps}: TIconButtonProps & {selected?: boolean},
		ref: ForwardedRef<HTMLButtonElement>,
	) => (
		<IconButton
			{...restProps}
			ref={ref}
			className={classNames(style.toggleIconButton, {[style.isNotSelected]: !selected})}
		>
			{iconType && <Icon type={iconType} size={iconSize} color={iconColor} />}
			{children}
		</IconButton>
	),
);

export default ToggleIconButton;
