import {createSelector} from '@infomat/core/src/Utils/Redux/createSelector';
import {TGeocodingSlice} from '@infomat/core/src/Redux/Geocoding/slice';
import {getGeocodingState} from '@infomat/core/src/Redux/Geocoding/Selectors/getGeocodingState';

export const selectGeocodingErrors = createSelector([getGeocodingState], (state: TGeocodingSlice) => ({
	errorAddress: state.errorAddress,
	errorCoordinates: state.errorCoordinates,
}));
