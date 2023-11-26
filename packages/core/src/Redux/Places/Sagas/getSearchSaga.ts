import {put} from 'typed-redux-saga';
import {AxiosResponse} from 'axios';
import _ from 'lodash';

import {placesClientToServerActions} from '@infomat/core/src/Redux/Places/Actions/placesClientToServerActions';
import {placesClientOnlyActions} from '@infomat/core/src/Redux/Places/Actions/placesClientOnlyActions';
import {TPlacesVM} from '@infomat/core/src/Redux/Places/entityAdapter';
import {TRespounse} from '@infomat/core/src/Types/PartialBy';
import {placesService} from '@infomat/core/src/Services/Api/places.service';

const getSearchSaga = function* ({payload}: ReturnType<typeof placesClientToServerActions.getSearch>) {
	try {
		const response: AxiosResponse = yield placesService.getList({
			size: 10,
			page: 0,
			search: payload,
		});
		const data: TRespounse<TPlacesVM> = response.data;
		yield* put(placesClientOnlyActions.setList(data.rows));
	} catch (error) {
		yield* put(placesClientOnlyActions.stopLoading());
	}
};

export default getSearchSaga;
