import {enumKeys} from '@infomat/uikit/src/Utils/enumKeys';
import {IconColor, IconSize, IconType} from '@infomat/uikit/src/Icon/types';

export const iconTypeControl = {
	control: 'select',
	options: enumKeys(IconType)
		.sort()
		.reduce(
			(acc: Record<any, any>, type) => {
				acc[type] = IconType[type];

				return acc;
			},
			{'-': ''},
		),
};

export const iconSizeControl = {
	control: 'select',
	options: enumKeys(IconSize).reduce((acc: Record<any, any>, size) => {
		acc[size] = IconSize[size];

		return acc;
	}, {}),
};

export const iconColorControl = {
	control: 'select',
	options: enumKeys(IconColor).reduce((acc: Record<any, any>, color) => {
		acc[color + (color === 'auto' ? ' (currentColor)' : '')] = IconColor[color];

		return acc;
	}, {}),
};
