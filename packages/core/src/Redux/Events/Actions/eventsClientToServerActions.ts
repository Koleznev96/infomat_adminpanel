import EnumStore from '@infomat/core/src/BusinessLogic/EnumStore';
import {ClientOnlyActions} from '@infomat/core/src/Actions/ActionCreator';
import {TEventsCreate} from '@infomat/core/src/Redux/Events/entityAdapter';

enum EnumClientToServerActions {
	GET = 'GET',
	GET_LIST = 'GET_LIST',
	UPDATE_CATEGORY = 'UPDATE_CATEGORY',
	CREAT_CATEGORY = 'CREAT_CATEGORY',
	DELETE_CATEGORY = 'DELETE_CATEGORY',
	GET_ALL_LIST = 'GET_ALL_LIST',
	DELETE_RECOMMEND = 'DELETE_RECOMMEND',
}

class EventsClientToServerActions extends ClientOnlyActions<EnumStore.EVENTS> {
	readonly scope = EnumStore.EVENTS;

	getList = this.createAction(
		EnumClientToServerActions.GET_LIST,
		this.getPrepareAction<{
			page?: number;
			size?: number;
			search?: string;
			status?: string | null;
			startDate?: boolean | null;
		}>(),
	);

	get = this.createAction(EnumClientToServerActions.GET, this.getPrepareAction<number>());

	updateCategory = this.createAction(EnumClientToServerActions.UPDATE_CATEGORY, this.getPrepareAction<TEventsCreate>());

	createCategory = this.createAction(EnumClientToServerActions.CREAT_CATEGORY, this.getPrepareAction<TEventsCreate>());

	deleteCategory = this.createAction(EnumClientToServerActions.DELETE_CATEGORY, this.getPrepareAction<{id: number}>());

	deleteRecommend = this.createAction(
		EnumClientToServerActions.DELETE_RECOMMEND,
		this.getPrepareAction<{id: number}>(),
	);
}

export const eventsClientToServerActions = new EventsClientToServerActions();
