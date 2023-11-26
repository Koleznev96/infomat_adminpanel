import {ClientOnlyActions} from '@infomat/core/src/Actions/ActionCreator';
import EnumStore from '@infomat/core/src/BusinessLogic/EnumStore';
import {TSubcategoryObjectVM, TSubcategoryObjectCreate} from '@infomat/core/src/Redux/SubcategoryObject/entityAdapter';

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
	SET_FILTER = 'SET_FILTER',
}

class SubcategoryObjectClientOnlyActions extends ClientOnlyActions<EnumStore.SUBCATEGORY_OBJECT> {
	readonly scope = EnumStore.SUBCATEGORY_OBJECT;

	upsertMany = this.createAction(EnumClientOnlyActions.UPSERT_MANY, this.getPrepareAction<TSubcategoryObjectVM[]>());

	setError = this.createAction(EnumClientOnlyActions.SET_ERROR, this.getPrepareAction<string | undefined>());

	update = this.createAction(EnumClientOnlyActions.UPDATE);

	resetStore = this.createAction(EnumClientOnlyActions.RESET_STORE);

	setData = this.createAction(EnumClientOnlyActions.SET_DATA, this.getPrepareAction<TSubcategoryObjectVM>());

	setTotalPages = this.createAction(EnumClientOnlyActions.SET_TOTAL, this.getPrepareAction<number>());

	stopLoading = this.createAction(EnumClientOnlyActions.STOP_LOADING);

	setFilter = this.createAction(EnumClientOnlyActions.SET_FILTER, this.getPrepareAction<number>());
}

export const subcategoryObjectClientOnlyActions = new SubcategoryObjectClientOnlyActions();
