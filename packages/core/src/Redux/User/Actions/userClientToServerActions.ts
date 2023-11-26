import EnumStore from '@infomat/core/src/BusinessLogic/EnumStore';
import {ClientOnlyActions} from '@infomat/core/src/Actions/ActionCreator';

enum EnumClientToServerActions {
	LOGIN = 'LOGIN',
}

class UserClientToServerActions extends ClientOnlyActions<EnumStore.USER> {
	readonly scope = EnumStore.USER;

	login = this.createAction(
		EnumClientToServerActions.LOGIN,
		this.getPrepareAction<{password: string; login: string}>(),
	);
}

export const userClientToServerActions = new UserClientToServerActions();
