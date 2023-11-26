import _ from 'lodash';

export function descSortComparerByField<T>(firstEntity: T, secondEntity: T, fieldToSortBy: keyof T) {
	const firstSortValue = _.get(firstEntity, fieldToSortBy);
	const secondSortValue = _.get(secondEntity, fieldToSortBy);

	if (firstSortValue && !secondSortValue) {
		return -1;
	}

	if (!_.isUndefined(firstSortValue) && !_.isUndefined(secondSortValue) && firstSortValue !== secondSortValue) {
		return firstSortValue < secondSortValue ? 1 : -1;
	}

	return 0;
}
