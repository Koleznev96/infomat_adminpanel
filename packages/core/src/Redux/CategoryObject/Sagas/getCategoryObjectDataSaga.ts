import {put} from 'typed-redux-saga';
import {AxiosResponse} from 'axios';

import {categoryObjectClientToServerActions} from '@infomat/core/src/Redux/CategoryObject/Actions/categoryObjectClientToServerActions';
import {categoryObjectClientOnlyActions} from '@infomat/core/src/Redux/CategoryObject/Actions/categoryObjectClientOnlyActions';
import {TRespounseData} from '@infomat/core/src/Types/PartialBy';
import {TCategoryObjectCreate} from '@infomat/core/src/Redux/CategoryObject/entityAdapter';
import {categoryObjectService} from '@infomat/core/src/Services/Api/categoryObject.service';

const getCategoryObjectDataSaga = function* ({payload}: ReturnType<typeof categoryObjectClientToServerActions.get>) {
	try {
		const response: AxiosResponse = yield categoryObjectService.getItem(payload);
		const data: TRespounseData<TCategoryObjectCreate> = response.data;
		yield* put(categoryObjectClientOnlyActions.setData(data.data));
	} catch (error) {
		yield* put(categoryObjectClientOnlyActions.stopLoading());
	}
};

export default getCategoryObjectDataSaga;
