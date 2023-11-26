import EnumStore from '@infomat/core/src/BusinessLogic/EnumStore';
import {ClientOnlyActions} from '@infomat/core/src/Actions/ActionCreator';
import {TCategoryObjectCreate} from '@infomat/core/src/Redux/CategoryObject/entityAdapter';

enum EnumClientToServerActions {
	GET = 'GET',
	GET_LIST = 'GET_LIST',
	UPDATE_CATEGORY = 'UPDATE_CATEGORY',
	CREAT_CATEGORY = 'CREAT_CATEGORY',
	DELETE_CATEGORY = 'DELETE_CATEGORY',
	GET_ALL_LIST = 'GET_ALL_LIST',
}

class CategoryObjectClientToServerActions extends ClientOnlyActions<EnumStore.CATEGORY_OBJECT> {
	readonly scope = EnumStore.CATEGORY_OBJECT;

	getList = this.createAction(
		EnumClientToServerActions.GET_LIST,
		this.getPrepareAction<{search?: string; size?: number; page?: number}>(),
	);

	getAllList = this.createAction(EnumClientToServerActions.GET_ALL_LIST);

	get = this.createAction(EnumClientToServerActions.GET, this.getPrepareAction<number>());

	updateCategory = this.createAction(
		EnumClientToServerActions.UPDATE_CATEGORY,
		this.getPrepareAction<TCategoryObjectCreate>(),
	);

	createCategory = this.createAction(
		EnumClientToServerActions.CREAT_CATEGORY,
		this.getPrepareAction<TCategoryObjectCreate>(),
	);

	deleteCategory = this.createAction(EnumClientToServerActions.DELETE_CATEGORY, this.getPrepareAction<{id: number}>());
}

export const categoryObjectClientToServerActions = new CategoryObjectClientToServerActions();
