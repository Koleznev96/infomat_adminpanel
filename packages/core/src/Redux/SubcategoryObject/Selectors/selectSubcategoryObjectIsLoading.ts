import {createSelector} from '@infomat/core/src/Utils/Redux/createSelector';
import {TSubcategoryObjectSlice} from '@infomat/core/src/Redux/SubcategoryObject/slice';
import {getSubcategoryObjectState} from '@infomat/core/src/Redux/SubcategoryObject/Selectors/getSubcategoryObjectState';

export const selectSubcategoryObjectIsLoading = createSelector(
	[getSubcategoryObjectState],
	(state: TSubcategoryObjectSlice) => state.isLoading,
);
