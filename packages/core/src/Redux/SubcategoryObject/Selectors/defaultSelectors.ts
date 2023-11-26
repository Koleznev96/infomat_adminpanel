import IRootState from '@infomat/core/src/Redux/IRootState';
import {TDefaultSelectors} from '@infomat/core/src/Redux/TDefaultSelectors';
import EnumStore from '@infomat/core/src/BusinessLogic/EnumStore';
import {TSubcategoryObjectVM, subcategoryObjectAdapter} from '@infomat/core/src/Redux/SubcategoryObject/entityAdapter';

const {selectIds, selectById, selectAll} = subcategoryObjectAdapter.getSelectors<IRootState>(
	(state) => state[EnumStore.SUBCATEGORY_OBJECT],
) as TDefaultSelectors<TSubcategoryObjectVM, number>;

export const selectSubcategoryObjectIds = selectIds;
export const selectSubcategoryObjectVMById = selectById;
export const selectSubcategoryObjectVMs = selectAll;
