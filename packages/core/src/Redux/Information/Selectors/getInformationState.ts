import IRootState from '@infomat/core/src/Redux/IRootState';
import EnumStore from '@infomat/core/src/BusinessLogic/EnumStore';

export const getInformationState = (state: IRootState) => state[EnumStore.INFORMATION];
