import IRootState from '@infomat/core/src/Redux/IRootState';
import EnumStore from '@infomat/core/src/BusinessLogic/EnumStore';

export const getCategoryObjectState = (state: IRootState) => state[EnumStore.CATEGORY_OBJECT];
