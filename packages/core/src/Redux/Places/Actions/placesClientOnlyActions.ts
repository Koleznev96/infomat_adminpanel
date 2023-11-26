import {ClientOnlyActions} from '@infomat/core/src/Actions/ActionCreator';
import EnumStore from '@infomat/core/src/BusinessLogic/EnumStore';
import {TPlacesCreate, TPlacesVM} from '@infomat/core/src/Redux/Places/entityAdapter';

enum EnumClientOnlyActions {
	RESET_STORE = 'RESET_STORE',
	UPSERT_MANY = 'UPSERT_MANY',
	UPDATE = 'UPDATE',
	SET_SEARCH = 'SET_SEARCH',
	SET_CURRENT_PAGE = 'SET_CURRENT_PAGE',
	SET_SIZE_PAGE = 'SET_SIZE_PAGE',
	SET_ERROR = 'SET_ERROR',
	SET_DATA = 'SET_DATA',
	SET_TOTAL = 'SET_TOTAL',
	STOP_LOADING = 'STOP_LOADING',
	SET_LIST = 'SET_LIST',
}

class PlacesClientOnlyActions extends ClientOnlyActions<EnumStore.PLACES> {
	readonly scope = EnumStore.PLACES;

	upsertMany = this.createAction(EnumClientOnlyActions.UPSERT_MANY, this.getPrepareAction<TPlacesVM[]>());

	setError = this.createAction(EnumClientOnlyActions.SET_ERROR, this.getPrepareAction<string | undefined>());

	update = this.createAction(EnumClientOnlyActions.UPDATE);

	resetStore = this.createAction(EnumClientOnlyActions.RESET_STORE);

	setData = this.createAction(EnumClientOnlyActions.SET_DATA, this.getPrepareAction<TPlacesCreate>());

	setTotalPages = this.createAction(EnumClientOnlyActions.SET_TOTAL, this.getPrepareAction<number>());

	stopLoading = this.createAction(EnumClientOnlyActions.STOP_LOADING);

	setList = this.createAction(EnumClientOnlyActions.SET_LIST, this.getPrepareAction<TPlacesVM[]>());
}

export const placesClientOnlyActions = new PlacesClientOnlyActions();
