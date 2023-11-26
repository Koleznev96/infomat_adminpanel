import IRootState from '@infomat/core/src/Redux/IRootState';
import EnumStore from '@infomat/core/src/BusinessLogic/EnumStore';

export const getPlacesState = (state: IRootState) => state[EnumStore.PLACES];
