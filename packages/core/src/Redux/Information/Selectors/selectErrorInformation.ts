import {createSelector} from '@infomat/core/src/Utils/Redux/createSelector';
import {TInformationSlice} from '@infomat/core/src/Redux/Information/slice';
import {getInformationState} from '@infomat/core/src/Redux/Information/Selectors/getInformationState';

export const selectErrorInformation = createSelector([getInformationState], (state: TInformationSlice) => state.error);
