import IRootState from '@infomat/core/src/Redux/IRootState';
import {TDefaultSelectors} from '@infomat/core/src/Redux/TDefaultSelectors';
import EnumStore from '@infomat/core/src/BusinessLogic/EnumStore';
import {TSpecialPlaceVM, specialPlaceAdapter} from '@infomat/core/src/Redux/SpecialPlace/entityAdapter';

const {selectIds, selectById, selectAll} = specialPlaceAdapter.getSelectors<IRootState>(
	(state) => state[EnumStore.SPECIAL_PLACES],
) as TDefaultSelectors<TSpecialPlaceVM, number>;

export const selectSpecialPlacesIds = selectIds;
export const selectSpecialPlacesVMById = selectById;
export const selectSpecialPlacesVMs = selectAll;
