import EnumStore from '@infomat/core/src/BusinessLogic/EnumStore';
import {ClientOnlyActions} from '@infomat/core/src/Actions/ActionCreator';
import {TInformationVM} from '@infomat/core/src/Redux/Information/type';

enum EnumClientToServerActions {
	GET_DETAILS = 'GET_DETAILS',
	UPDATE_DETAILS = 'UPDATE_DETAILS',
}

class InformationClientToServerActions extends ClientOnlyActions<EnumStore.INFORMATION> {
	readonly scope = EnumStore.INFORMATION;

	getDeatails = this.createAction(EnumClientToServerActions.GET_DETAILS);

	updateDetails = this.createAction(EnumClientToServerActions.UPDATE_DETAILS, this.getPrepareAction<TInformationVM>());
}

export const informationClientToServerActions = new InformationClientToServerActions();
