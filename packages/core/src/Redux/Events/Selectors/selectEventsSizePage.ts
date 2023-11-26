import {createSelector} from '@infomat/core/src/Utils/Redux/createSelector';
import {TEventsSlice} from '@infomat/core/src/Redux/Events/slice';
import {getEventsState} from '@infomat/core/src/Redux/Events/Selectors/getEventsState';

export const selectEventsSizePage = createSelector([getEventsState], (state: TEventsSlice) => state.sizePage);
