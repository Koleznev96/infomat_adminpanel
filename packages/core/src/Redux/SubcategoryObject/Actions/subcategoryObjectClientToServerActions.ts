import EnumStore from '@infomat/core/src/BusinessLogic/EnumStore';
import {ClientOnlyActions} from '@infomat/core/src/Actions/ActionCreator';
import {TSubcategoryObjectCreate} from '@infomat/core/src/Redux/SubcategoryObject/entityAdapter';

enum EnumClientToServerActions {
	GET = 'GET',
	GET_LIST = 'GET_LIST',
	UPDATE_CATEGORY = 'UPDATE_CATEGORY',
	CREAT_CATEGORY = 'CREAT_CATEGORY',
	DELETE_CATEGORY = 'DELETE_CATEGORY',
	GET_ALL_LIST = 'GET_ALL_LIST',
}

class SubcategoryObjectClientToServerActions extends ClientOnlyActions<EnumStore.SUBCATEGORY_OBJECT> {
	readonly scope = EnumStore.SUBCATEGORY_OBJECT;

	getList = this.createAction(
		EnumClientToServerActions.GET_LIST,
		this.getPrepareAction<{search?: string; size?: number; page?: number}>(),
	);

	get = this.createAction(EnumClientToServerActions.GET, this.getPrepareAction<number>());

	getAllList = this.createAction(EnumClientToServerActions.GET_ALL_LIST);

	updateCategory = this.createAction(
		EnumClientToServerActions.UPDATE_CATEGORY,
		this.getPrepareAction<TSubcategoryObjectCreate & {categoryId?: number}>(),
	);

	createCategory = this.createAction(
		EnumClientToServerActions.CREAT_CATEGORY,
		this.getPrepareAction<TSubcategoryObjectCreate & {categoryId?: number}>(),
	);

	deleteCategory = this.createAction(EnumClientToServerActions.DELETE_CATEGORY, this.getPrepareAction<{id: number}>());
}

export const subcategoryObjectClientToServerActions = new SubcategoryObjectClientToServerActions();
