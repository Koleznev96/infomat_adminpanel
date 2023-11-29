import EnumStore from '@infomat/core/src/BusinessLogic/EnumStore';
import {ClientOnlyActions} from '@infomat/core/src/Actions/ActionCreator';
import {TPlacesCreate} from '../entityAdapter';

enum EnumClientToServerActions {
	GET = 'GET',
	GET_LIST = 'GET_LIST',
	UPDATE_CATEGORY = 'UPDATE_CATEGORY',
	CREAT_CATEGORY = 'CREAT_CATEGORY',
	DELETE_CATEGORY = 'DELETE_CATEGORY',
	GET_ALL_LIST = 'GET_ALL_LIST',
	DELETE_RECOMMEND = 'DELETE_RECOMMEND',
	GET_SEARCH = 'GET_SEARCH',
}

class PlacesClientToServerActions extends ClientOnlyActions<EnumStore.PLACES> {
	readonly scope = EnumStore.PLACES;

	getList = this.createAction(
		EnumClientToServerActions.GET_LIST,
		this.getPrepareAction<{
			page?: number;
			size?: number;
			search?: string;
			status?: string | null;
			recommendedOnly?: boolean | null;
			subcategoryId?: number | null;
		}>(),
	);

	getSearch = this.createAction(EnumClientToServerActions.GET_SEARCH, this.getPrepareAction<string>());

	get = this.createAction(EnumClientToServerActions.GET, this.getPrepareAction<number>());

	updateCategory = this.createAction(EnumClientToServerActions.UPDATE_CATEGORY, this.getPrepareAction<TPlacesCreate>());

	createCategory = this.createAction(EnumClientToServerActions.CREAT_CATEGORY, this.getPrepareAction<TPlacesCreate>());

	deleteCategory = this.createAction(EnumClientToServerActions.DELETE_CATEGORY, this.getPrepareAction<{id: number}>());

	deleteRecommend = this.createAction(
		EnumClientToServerActions.DELETE_RECOMMEND,
		this.getPrepareAction<{id: number}>(),
	);
}

export const placesClientToServerActions = new PlacesClientToServerActions();
