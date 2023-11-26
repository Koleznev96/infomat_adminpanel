import {ClientOnlyActions} from '@infomat/core/src/Actions/ActionCreator';
import EnumStore from '@infomat/core/src/BusinessLogic/EnumStore';

enum EnumClientOnlyActions {
	SET_ERRORS = 'SET_ERRORS',
	RESET_STORE = 'RESET_STORE',
	UPSET_DETAILES = 'UPSET_DETAILES',
	UPDATE_NETWORK_STATUS = 'UPDATE_NETWORK_STATUS',
	LOGOUT = 'LOGOUT',
	LOGIN_IN = 'LOGIN_IN',
}

class UserClientOnlyActions extends ClientOnlyActions<EnumStore.USER> {
	readonly scope = EnumStore.USER;

	upsetDetailes = this.createAction(
		EnumClientOnlyActions.UPSET_DETAILES,
		this.getPrepareAction<{token?: string; login?: string; error?: string}>(),
	);

	setErrors = this.createAction(
		EnumClientOnlyActions.SET_ERRORS,
		this.getPrepareAction<{errorCoordinates?: string; errorAddress?: string}>(),
	);

	updateNetworkStatus = this.createAction(
		EnumClientOnlyActions.UPDATE_NETWORK_STATUS,
		this.getPrepareAction<boolean>(),
	);

	logout = this.createAction(EnumClientOnlyActions.LOGOUT);

	resetStore = this.createAction(EnumClientOnlyActions.RESET_STORE);

	login = this.createAction(EnumClientOnlyActions.LOGIN_IN, this.getPrepareAction<string | undefined>());
}

export const userClientOnlyActions = new UserClientOnlyActions();
