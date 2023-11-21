import React, {ComponentProps, ForwardedRef, forwardRef} from 'react';
import classNames from 'classnames';

import ActionIconButton from '@infomat/uikit/src/IconButton/ActionIconButton/ActionIconButton';
import {IconColor, IconSize, IconType} from '@infomat/uikit/src/Icon';

import style from './ScrollToIconButton.module.scss';

const ScrollToIconButton = forwardRef(
	({className, ...restProps}: ComponentProps<typeof ActionIconButton>, ref: ForwardedRef<HTMLButtonElement>) => (
		<ActionIconButton
			{...restProps}
			ref={ref}
			iconType={IconType.keyboardArrowDown}
			iconSize={IconSize.large}
			iconColor={IconColor.lightgrey}
			className={classNames(className, style.button)}
		/>
	),
);

export default ScrollToIconButton;
