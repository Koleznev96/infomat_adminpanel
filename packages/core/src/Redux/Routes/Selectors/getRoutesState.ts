import IRootState from '@infomat/core/src/Redux/IRootState';
import EnumStore from '@infomat/core/src/BusinessLogic/EnumStore';

export const getRoutesState = (state: IRootState) => state[EnumStore.ROUTES];
