import EnumStore from '@infomat/core/src/BusinessLogic/EnumStore';
import {ClientOnlyActions} from '@infomat/core/src/Actions/ActionCreator';

enum EnumClientToServerActions {
	GET_GEOCODING = 'GET_GEOCODING',
	GET_ADDRESS = 'GET_ADDRESS',
	GET_ADDRESS_DRAGEND = 'GET_ADDRESS_DRAGEND',
}

class GeocodingClientToServerActions extends ClientOnlyActions<EnumStore.GEOCODING> {
	readonly scope = EnumStore.GEOCODING;

	getGeocoding = this.createAction(EnumClientToServerActions.GET_GEOCODING, this.getPrepareAction<string>());

	getAddress = this.createAction(
		EnumClientToServerActions.GET_ADDRESS,
		this.getPrepareAction<{latitude?: number; longitude?: number}>(),
	);

	getAddressDragend = this.createAction(
		EnumClientToServerActions.GET_ADDRESS_DRAGEND,
		this.getPrepareAction<{latitude?: number; longitude?: number}>(),
	);
}

export type TChannelGroupRequestPayload = {
	channelId?: string;
	groupId?: string[] | string;
};

export const geocodingClientToServerActions = new GeocodingClientToServerActions();
