import {put} from 'typed-redux-saga';
import {AxiosResponse} from 'axios';

import {routesClientOnlyActions} from '@infomat/core/src/Redux/Routes/Actions/routesClientOnlyActions';
import {routesClientToServerActions} from '@infomat/core/src/Redux/Routes/Actions/routesClientToServerActions';
import {TRespounseData} from '@infomat/core/src/Types/PartialBy';
import {TRoutesCreate} from '@infomat/core/src/Redux/Routes/entityAdapter';
import {routesService} from '@infomat/core/src/Services/Api/routes.service';

const getDataSaga = function* ({payload}: ReturnType<typeof routesClientToServerActions.get>) {
	try {
		const response: AxiosResponse = yield routesService.getItem(payload);
		const data: TRespounseData<TRoutesCreate> = response.data;
		yield* put(routesClientOnlyActions.setData(data.data));
	} catch (error) {
		yield* put(routesClientOnlyActions.stopLoading());
	}
};

export default getDataSaga;
