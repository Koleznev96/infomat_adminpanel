import IRootState from '@infomat/core/src/Redux/IRootState';
import {TDefaultSelectors} from '@infomat/core/src/Redux/TDefaultSelectors';
import EnumStore from '@infomat/core/src/BusinessLogic/EnumStore';
import {TCategoryObjectVM, categoryObjectAdapter} from '@infomat/core/src/Redux/CategoryObject/entityAdapter';

const {selectIds, selectById, selectAll} = categoryObjectAdapter.getSelectors<IRootState>(
	(state) => state[EnumStore.CATEGORY_OBJECT],
) as TDefaultSelectors<TCategoryObjectVM, number>;

export const selectCategoryObjectIds = selectIds;
export const selectCategoryObjectVMById = selectById;
export const selectCategoryObjectVMs = selectAll;
