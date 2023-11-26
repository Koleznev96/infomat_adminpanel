import _ from 'lodash';

import {createSelector} from '@infomat/core/src/Utils/Redux/createSelector';

import {selectSubcategoryObjectVMs} from './defaultSelectors';

export const selectSubcategoryObjectGroupedIds = createSelector([selectSubcategoryObjectVMs], (subcategoryObjects) => {
	const groupedSubcategory = _.groupBy(subcategoryObjects, 'category.id');

	const groupedSubcategoryIds = _.map(groupedSubcategory, (groupedValue) => {
		const title = groupedValue[0].category.title;
		const ids = _.map(groupedValue, 'id');
		return {title, ids};
	});

	return groupedSubcategoryIds;
});
