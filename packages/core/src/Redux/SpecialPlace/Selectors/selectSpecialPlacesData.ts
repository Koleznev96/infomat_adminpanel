import {createSelector} from '@infomat/core/src/Utils/Redux/createSelector';
import {TSpecialPlaceSlice} from '@infomat/core/src/Redux/SpecialPlace/slice';
import {getSpecialPlacesState} from '@infomat/core/src/Redux/SpecialPlace/Selectors/getSpecialPlacesState';

export const selectSpecialPlacesData = createSelector(
	[getSpecialPlacesState],
	(state: TSpecialPlaceSlice) => state.data,
);
