import {ClientOnlyActions} from '@infomat/core/src/Actions/ActionCreator';
import EnumStore from '@infomat/core/src/BusinessLogic/EnumStore';
import {TAddress} from '@infomat/core/src/Redux/Geocoding/entityAdapter';

enum EnumClientOnlyActions {
	UPSERT_ADDRESS = 'UPSERT_ADDRESS',
	UPSERT_COORDINATES = 'UPSERT_COORDINATES',
	RESET_STORE = 'RESET_STORE',
	SET_ERRORS = 'SET_ERRORS',
	STOP_LOADING = 'STOP_LOADING',
	RESET = 'RESET',
	UPSERT_COORDINATES_DRAGEND = 'UPSERT_COORDINATES_DRAGEND',
}

class GeocodingClientOnlyActions extends ClientOnlyActions<EnumStore.GEOCODING> {
	readonly scope = EnumStore.GEOCODING;

	upsertAddress = this.createAction(EnumClientOnlyActions.UPSERT_ADDRESS, this.getPrepareAction<TAddress[]>());

	upsertCoordinates = this.createAction(EnumClientOnlyActions.UPSERT_COORDINATES, this.getPrepareAction<TAddress>());

	upsertCoordinatesDragend = this.createAction(
		EnumClientOnlyActions.UPSERT_COORDINATES_DRAGEND,
		this.getPrepareAction<TAddress>(),
	);

	setErrors = this.createAction(
		EnumClientOnlyActions.SET_ERRORS,
		this.getPrepareAction<{errorCoordinates?: string; errorAddress?: string}>(),
	);

	resetStore = this.createAction(EnumClientOnlyActions.RESET_STORE);

	stopLoading = this.createAction(EnumClientOnlyActions.STOP_LOADING);

	reset = this.createAction(EnumClientOnlyActions.RESET);
}

const geocodingClientOnlyActions = new GeocodingClientOnlyActions();

export default geocodingClientOnlyActions;
