import {createSelector} from '@infomat/core/src/Utils/Redux/createSelector';
import {TRoutesSlice} from '@infomat/core/src/Redux/Routes/slice';
import {getRoutesState} from '@infomat/core/src/Redux/Routes/Selectors/getRoutesState';

export const selectRoutesCurrentPage = createSelector([getRoutesState], (state: TRoutesSlice) => state.currentPage);
