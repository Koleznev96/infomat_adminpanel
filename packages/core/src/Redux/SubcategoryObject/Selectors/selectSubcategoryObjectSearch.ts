import {createSelector} from '@infomat/core/src/Utils/Redux/createSelector';
import {TSubcategoryObjectSlice} from '@infomat/core/src/Redux/SubcategoryObject/slice';
import {getSubcategoryObjectState} from '@infomat/core/src/Redux/SubcategoryObject/Selectors/getSubcategoryObjectState';

export const selectSubcategoryObjectSearch = createSelector(
	[getSubcategoryObjectState],
	(state: TSubcategoryObjectSlice) => state.search,
);
