import {put} from 'typed-redux-saga';
import {AxiosResponse} from 'axios';

import {placesClientOnlyActions} from '@infomat/core/src/Redux/Places/Actions/placesClientOnlyActions';
import {placesClientToServerActions} from '@infomat/core/src/Redux/Places/Actions/placesClientToServerActions';
import {TRespounseData} from '@infomat/core/src/Types/PartialBy';
import {TPlacesCreate} from '@infomat/core/src/Redux/Places/entityAdapter';
import {placesService} from '@infomat/core/src/Services/Api/places.service';

const getDataSaga = function* ({payload}: ReturnType<typeof placesClientToServerActions.get>) {
	try {
		const response: AxiosResponse = yield placesService.getItem(payload);
		const data: TRespounseData<TPlacesCreate> = response.data;
		yield* put(placesClientOnlyActions.setData(data.data));
	} catch (error) {
		yield* put(placesClientOnlyActions.stopLoading());
	}
};

export default getDataSaga;
