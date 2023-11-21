import React, {forwardRef, RefObject, MouseEvent} from 'react';
import classNames from 'classnames';
import {Icon as MdiIcon} from '@mdi/react';
import _ from 'lodash';

import {iconsMap} from '@infomat/uikit/src/Icon/IconMap';

import {IconColor, IconSize, IconType, IconSource} from './types';
import './Icon.scss';

const baseCls = 'svg-icon';

export const Icon = forwardRef<SVGSVGElement, TIconProps>(
	({type, className: additionalCls, size = IconSize.default, color = IconColor.auto, ...rest}, ref) => {
		const IconCmp = iconsMap[type];
		const iconSize = IconSize[size];
		const iconColor = IconColor[color];
		const iconSource = getIconSource(type);
		const kebabCaseName = _.kebabCase(IconType[type]);
		const dataTestId = _.get(rest, 'data-test-id', `e2e-icon-${kebabCaseName}`);
		const dataTestColor = _.get(rest, 'data-test-color', `e2e-color-${iconColor}`);

		const className = classNames({
			[baseCls]: true,
			[`${baseCls}-${IconSource[iconSource]}`]: true,
			[`${baseCls}-${kebabCaseName}`]: true,
			[`${baseCls}-${iconSize}`]: true,
			[`${baseCls}-${iconColor}`]: color !== IconColor.auto,
			[additionalCls || '']: !!additionalCls,
		});

		return _.isString(IconCmp) ? (
			<MdiIcon
				className={className}
				ref={ref as RefObject<SVGSVGElement>}
				path={IconCmp}
				{...rest}
				data-test-id={dataTestId}
				data-test-color={dataTestColor}
			/>
		) : (
			<IconCmp className={className} ref={ref} {...rest} data-test-id={dataTestId} data-test-color={dataTestColor} />
		);
	},
);

export const getIconSource = (iconType: IconType) => {
	if (_.isString(iconsMap[iconType])) {
		return IconSource.mdi;
	} else if (!_.get(iconsMap[iconType], 'render')) {
		return IconSource.mui;
	}

	return IconSource.theme;
};

type TIconProps = {
	type: IconType;
	className?: string;
	style?: object;
	size?: IconSize;
	color?: IconColor;
	onClick?: (e: MouseEvent) => void;
};
