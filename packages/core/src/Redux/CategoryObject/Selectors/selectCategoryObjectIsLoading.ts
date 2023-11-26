import {createSelector} from '@infomat/core/src/Utils/Redux/createSelector';
import {TCategoryObjectSlice} from '@infomat/core/src/Redux/CategoryObject/slice';
import {getCategoryObjectState} from '@infomat/core/src/Redux/CategoryObject/Selectors/getCategoryObjectState';

export const selectCategoryObjectIsLoading = createSelector(
	[getCategoryObjectState],
	(state: TCategoryObjectSlice) => state.isLoading,
);
