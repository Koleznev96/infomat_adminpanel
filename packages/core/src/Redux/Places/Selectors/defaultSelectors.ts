import IRootState from '@infomat/core/src/Redux/IRootState';
import {TDefaultSelectors} from '@infomat/core/src/Redux/TDefaultSelectors';
import EnumStore from '@infomat/core/src/BusinessLogic/EnumStore';
import {TPlacesVM, placesAdapter} from '@infomat/core/src/Redux/Places/entityAdapter';

const {selectIds, selectById, selectAll} = placesAdapter.getSelectors<IRootState>(
	(state) => state[EnumStore.PLACES],
) as TDefaultSelectors<TPlacesVM, number>;

export const selectPlacesIds = selectIds;
export const selectPlacesVMById = selectById;
export const selectPlacesVMs = selectAll;
