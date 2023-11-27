import {TVideo} from '@infomat/core/src/Types/media';
import _ from 'lodash';

export function checkUrlsNull(arr: TVideo[]) {
	if (!arr.length) return true;

	return _.every(arr, (obj) => {
		// Проверяем, что поля url и url3x2Original равны null или undefined
		return (
			(_.isNull(obj.url) || _.isUndefined(obj.url)) &&
			(_.isNull(obj.url3x2Original) || _.isUndefined(obj.url3x2Original))
		);
	});
}
