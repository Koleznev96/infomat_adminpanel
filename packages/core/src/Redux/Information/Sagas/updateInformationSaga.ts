import {put} from 'typed-redux-saga';
import {AxiosResponse} from 'axios';

import {informationClientToServerActions} from '@infomat/core/src/Redux/Information/Actions/informationClientToServerActions';
import {informationClientOnlyActions} from '@infomat/core/src/Redux/Information/Actions/informationClientOnlyActions';
import {informationService} from '@infomat/core/src/Services/Api/information.service';
import {TRespounseData} from '@infomat/core/src/Types/PartialBy';
import {TInformationVM} from '@infomat/core/src/Redux/Information/type';

const updateInformationSaga = function* ({payload}: ReturnType<typeof informationClientToServerActions.updateDetails>) {
	try {
		const response: AxiosResponse = yield informationService.updateData(payload);
		const data: TRespounseData<TInformationVM> = response.data;
		yield* put(informationClientOnlyActions.upsetDetailes(data.data));
	} catch (error) {
		yield* put(informationClientOnlyActions.stopLoading());
	}
};

export default updateInformationSaga;
