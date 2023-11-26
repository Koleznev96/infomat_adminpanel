import {createSelector} from '@infomat/core/src/Utils/Redux/createSelector';
import {TUserSlice} from '@infomat/core/src/Redux/User/slice';
import {getUserState} from '@infomat/core/src/Redux/User/Selectors/getUserState';

export const selectIsNetworkAvailable = createSelector([getUserState], (state: TUserSlice) => state.isNetworkAvailable);
