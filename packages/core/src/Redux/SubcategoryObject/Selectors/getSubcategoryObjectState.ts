import IRootState from '@infomat/core/src/Redux/IRootState';
import EnumStore from '@infomat/core/src/BusinessLogic/EnumStore';

export const getSubcategoryObjectState = (state: IRootState) => state[EnumStore.SUBCATEGORY_OBJECT];
