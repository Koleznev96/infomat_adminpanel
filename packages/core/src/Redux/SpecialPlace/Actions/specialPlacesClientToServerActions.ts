import EnumStore from '@infomat/core/src/BusinessLogic/EnumStore';
import {ClientOnlyActions} from '@infomat/core/src/Actions/ActionCreator';
import {TSpecialPlaceCreate, TSpecialPlaceVM} from '@infomat/core/src/Redux/SpecialPlace/entityAdapter';

enum EnumClientToServerActions {
	GET = 'GET',
	GET_LIST = 'GET_LIST',
	UPDATE_CATEGORY = 'UPDATE_CATEGORY',
	CREAT_CATEGORY = 'CREAT_CATEGORY',
	DELETE_CATEGORY = 'DELETE_CATEGORY',
}

class SpecialPlacesClientToServerActions extends ClientOnlyActions<EnumStore.SPECIAL_PLACES> {
	readonly scope = EnumStore.SPECIAL_PLACES;

	getList = this.createAction(
		EnumClientToServerActions.GET_LIST,
		this.getPrepareAction<{
			page?: number;
			size?: number;
			search?: string;
			type?: string | null;
		}>(),
	);

	get = this.createAction(EnumClientToServerActions.GET, this.getPrepareAction<number>());

	updateCategory = this.createAction(
		EnumClientToServerActions.UPDATE_CATEGORY,
		this.getPrepareAction<TSpecialPlaceCreate>(),
	);

	createCategory = this.createAction(
		EnumClientToServerActions.CREAT_CATEGORY,
		this.getPrepareAction<TSpecialPlaceCreate>(),
	);

	deleteCategory = this.createAction(EnumClientToServerActions.DELETE_CATEGORY, this.getPrepareAction<{id: number}>());
}

export const specialPlacesClientToServerActions = new SpecialPlacesClientToServerActions();
