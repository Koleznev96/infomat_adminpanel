import IRootState from '@infomat/core/src/Redux/IRootState';
import {TDefaultSelectors} from '@infomat/core/src/Redux/TDefaultSelectors';
import EnumStore from '@infomat/core/src/BusinessLogic/EnumStore';
import {TRoutesVM, routesAdapter} from '@infomat/core/src/Redux/Routes/entityAdapter';

const {selectIds, selectById, selectAll} = routesAdapter.getSelectors<IRootState>(
	(state) => state[EnumStore.ROUTES],
) as TDefaultSelectors<TRoutesVM, number>;

export const selectRoutesIds = selectIds;
export const selectRoutesVMById = selectById;
export const selectRoutesVMs = selectAll;
