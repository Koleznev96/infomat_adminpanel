import IRootState from '@infomat/core/src/Redux/IRootState';
import EnumStore from '@infomat/core/src/BusinessLogic/EnumStore';

export const getGeocodingState = (state: IRootState) => state[EnumStore.GEOCODING];
