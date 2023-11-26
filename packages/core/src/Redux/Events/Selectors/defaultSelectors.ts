import IRootState from '@infomat/core/src/Redux/IRootState';
import {TDefaultSelectors} from '@infomat/core/src/Redux/TDefaultSelectors';
import EnumStore from '@infomat/core/src/BusinessLogic/EnumStore';
import {TEventsVM, eventsAdapter} from '@infomat/core/src/Redux/Events/entityAdapter';

const {selectIds, selectById, selectAll} = eventsAdapter.getSelectors<IRootState>(
	(state) => state[EnumStore.EVENTS],
) as TDefaultSelectors<TEventsVM, number>;

export const selectEventsIds = selectIds;
export const selectEventsVMById = selectById;
export const selectEventsVMs = selectAll;
