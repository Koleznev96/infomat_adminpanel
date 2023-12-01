import {put} from 'typed-redux-saga';
import {AxiosResponse} from 'axios';

import {specialPlacesClientToServerActions} from '@infomat/core/src/Redux/SpecialPlace/Actions/specialPlacesClientToServerActions';
import {specialPlacesClientOnlyActions} from '@infomat/core/src/Redux/SpecialPlace/Actions/specialPlacesClientOnlyActions';
import {TSpecialPlaceCreate} from '@infomat/core/src/Redux/SpecialPlace/entityAdapter';
import {TRespounseData} from '@infomat/core/src/Types/PartialBy';
import {specialPlacesService} from '@infomat/core/src/Services/Api/specialPlaces.service';

const getDataSaga = function* ({payload}: ReturnType<typeof specialPlacesClientToServerActions.get>) {
	try {
		const response: AxiosResponse = yield specialPlacesService.getItem(payload);
		const data: TRespounseData<TSpecialPlaceCreate> = response.data;
		yield* put(specialPlacesClientOnlyActions.setData(data.data));
	} catch (error) {
		yield* put(specialPlacesClientOnlyActions.stopLoading());
	}
};

export default getDataSaga;
