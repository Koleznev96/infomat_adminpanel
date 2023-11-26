import IRootState from '@infomat/core/src/Redux/IRootState';
import EnumStore from '@infomat/core/src/BusinessLogic/EnumStore';

export const getEventsState = (state: IRootState) => state[EnumStore.EVENTS];
