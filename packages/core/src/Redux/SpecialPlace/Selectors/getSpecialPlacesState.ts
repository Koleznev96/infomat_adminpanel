import IRootState from '@infomat/core/src/Redux/IRootState';
import EnumStore from '@infomat/core/src/BusinessLogic/EnumStore';

export const getSpecialPlacesState = (state: IRootState) => state[EnumStore.SPECIAL_PLACES];
