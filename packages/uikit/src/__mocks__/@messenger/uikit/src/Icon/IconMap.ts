import {LoDashStatic} from 'lodash';

const _: LoDashStatic = jest.requireActual('lodash');
const enumKeys = jest.requireActual('@infomat/uikit/src/Utils/enumKeys').enumKeys;
const IconType = jest.requireActual('@infomat/uikit/src/Icon/types').IconType;

export const iconsMap = _.chain(enumKeys(IconType))
	.map((type) => [IconType[type], type])
	.fromPairs()
	.value();
