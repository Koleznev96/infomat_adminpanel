import {fromPairs, kebabCase} from 'lodash';

import {enumKeys} from '@infomat/uikit/src/Utils/enumKeys';

export enum IconSize {
	inherit,
	auto,
	nano,
	micro,
	tiny,
	small,
	default,
	medium,
	large,
	xlarge,
	xxlarge,
}

export enum IconColor {
	auto,
	grey,
	lightgrey,
	cherry,
	white,
	blue,
	orange,
	red,
	green,
	black,
}

export enum IconType {
	// mui
	keyboardArrowUp,
	keyboardArrowDown,
	add,
	logout,
	iterationDLeft,
	iterationLeft,
	iterationDRight,
	iterationRight,
	close,
	moreHoriz,
	search,
	visibility,
	visibilityOff,
	keyboardArrowUpOut,
	warning,
	info,
	insertDriveFile,
	checkCircleRounded,
	error,
	refresh,
	home,

	//theme
	mapOutlined,
	route,
	like,
	calendar,
	warningBox,
	ru,
	en,
	paragraph,
	chevronsDownUp,
	time,
	object,
}

export enum IconSource {
	theme,
	mui,
	mdi,
}

export const IconNames = fromPairs(enumKeys(IconType).map((icon) => [icon, kebabCase(icon)]));
