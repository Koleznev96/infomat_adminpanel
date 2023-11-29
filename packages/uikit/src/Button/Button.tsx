import React, {ElementType, ForwardedRef, forwardRef} from 'react';
import {Button as MuiButton, ButtonProps, CircularProgress} from '@mui/material';
import _ from 'lodash';
import classNames from 'classnames';

import {Icon, IconColor, IconSize, IconType} from '@infomat/uikit/src/Icon';

const Button = forwardRef(
	(
		{
			startIconType,
			endIconType,
			iconType,
			children,
			className,
			iconSize = IconSize.inherit,
			isInProgress = false,
			isTextTransform = false,
			iconColor,
			...props
		}: TButtonProps,
		ref: ForwardedRef<HTMLButtonElement>,
	) => {
		return (
			<MuiButton
				style={!isTextTransform ? {textTransform: 'none'} : undefined}
				{...props}
				ref={ref}
				startIcon={
					isInProgress ? (
						<CircularProgress color="primary" size={16} />
					) : (
						startIconType && <Icon color={iconColor} type={startIconType} size={iconSize} />
					)
				}
				endIcon={
					(endIconType && <Icon color={iconColor} type={endIconType} size={iconSize} />) ||
					(iconType && <Icon color={iconColor} type={iconType} size={iconSize} />)
				}
				className={classNames(className, {
					'Mui-iconOnly': !_.isUndefined(iconType) && !children,
					'Mui-startIcon': !_.isUndefined(startIconType) || isInProgress,
				})}
			>
				{children}
			</MuiButton>
		);
	},
);

export type TButtonProps = Pick<
	ButtonProps,
	| 'onClick'
	| 'disabled'
	| 'type'
	| 'tabIndex'
	| 'autoFocus'
	| 'href'
	| 'size'
	| 'children'
	| 'variant'
	| 'color'
	| 'className'
	| 'disableRipple'
> & {
	component?: ElementType;
	startIconType?: IconType;
	endIconType?: IconType;
	iconType?: IconType;
	iconSize?: IconSize;
	isInProgress?: boolean;
	target?: '_blank';
	rel?: string;
	isTextTransform?: boolean;
	iconColor?: IconColor;
};

export default Button;
