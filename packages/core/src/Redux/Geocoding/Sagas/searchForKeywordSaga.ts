import {put} from 'typed-redux-saga';
import {AxiosResponse} from 'axios';

import geocodingClientOnlyActions from '@infomat/core/src/Redux/Geocoding/Actions/geocodingClientOnlyActions';
import {geocodingClientToServerActions} from '@infomat/core/src/Redux/Geocoding/Actions/geocodingClientToServerActions';
import {TAddress} from '@infomat/core/src/Redux/Geocoding/entityAdapter';
import {geocodingService} from '@infomat/core/src/Services/Api/geocoding.service';

const searchForKeywordSaga = function* ({payload}: ReturnType<typeof geocodingClientToServerActions.getGeocoding>) {
	try {
		const response: AxiosResponse = yield geocodingService.getForKeyword(payload);
		const data: TAddress[] = response.data;
		yield* put(geocodingClientOnlyActions.upsertAddress(data));
	} catch (error) {
		yield* put(geocodingClientOnlyActions.stopLoading());
	}
};

export default searchForKeywordSaga;
