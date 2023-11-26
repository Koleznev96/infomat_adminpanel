import {Action} from 'redux';

import EnumActions from './EnumActions';

export enum EnumStopStreamWarningAction {
	LOGOUT,
	STOP_STREAM,
}

abstract class ActionCreator {
	static clientReady = (): Action<EnumActions.READY> => ({
		type: EnumActions.READY,
	});

	static disableServer = (): Action<EnumActions.DISABLE_SERVER> => ({
		type: EnumActions.DISABLE_SERVER,
	});

	static globalError = (code: number, reason: string): TGlobalErrorAction => ({
		type: EnumActions.GLOBAL_ERROR,
		code,
		reason,
	});

	static resetStore = () => ({
		type: EnumActions.RESET_STORE,
	});
}

export type TGlobalErrorAction = {
	code: number;
	reason: string;
} & Action<EnumActions.GLOBAL_ERROR>;

export default ActionCreator;
