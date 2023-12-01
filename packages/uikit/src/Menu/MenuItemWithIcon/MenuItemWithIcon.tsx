import React, {ElementType, forwardRef, ReactNode} from 'react';
import {ListItemText, MenuItem, MenuItemProps, ListItemIcon, Typography} from '@mui/material';
import classNames from 'classnames';
import {Link as RouterLink} from 'react-router-dom';
import _ from 'lodash';

import {Icon, IconColor, IconSize, IconType} from '@infomat/uikit/src/Icon';

import style from './MenuItemWithIcon.module.scss';

const MenuItemWithIcon = forwardRef<
	HTMLLIElement,
	MenuItemProps & {
		children?: ReactNode;
		iconType?: IconType;
		component?: ElementType;
		target?: '_blank';
		rel?: string;
		href?: string;
		label?: string;
		iconSize?: IconSize;
		to?: string;
		colorIcon?: IconColor;
	}
>(({children, iconType, iconSize, label, to, colorIcon = IconColor.white, ...restProps}, ref) => (
	<MenuItem
		component={RouterLink}
		to={to}
		className={classNames(style.item, {[style.withIcon]: !_.isUndefined(iconType)})}
		{...restProps}
		ref={ref}
	>
		{iconType && (
			<ListItemIcon className={style.icon}>
				<Icon type={iconType} size={iconSize} color={colorIcon} />
			</ListItemIcon>
		)}
		{label && (
			<ListItemText>
				<Typography className={classNames(style.label, {[style.withIcon]: !_.isUndefined(iconType)})}>
					{label}
				</Typography>
			</ListItemText>
		)}
		{children}
	</MenuItem>
));

export default MenuItemWithIcon;
