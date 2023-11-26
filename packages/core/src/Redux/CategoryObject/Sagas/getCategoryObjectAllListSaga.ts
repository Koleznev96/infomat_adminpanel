import {put} from 'typed-redux-saga';
import {AxiosResponse} from 'axios';

import {categoryObjectClientOnlyActions} from '@infomat/core/src/Redux/CategoryObject/Actions/categoryObjectClientOnlyActions';
import {categoryObjectService} from '@infomat/core/src/Services/Api/categoryObject.service';
import {TCategoryObjectVM} from '@infomat/core/src/Redux/CategoryObject/entityAdapter';
import {TRespounse} from '@infomat/core/src/Types/PartialBy';

const getCategoryObjectAllListSaga = function* () {
	try {
		const response: AxiosResponse = yield categoryObjectService.getList({
			size: 100,
			page: 0,
		});
		const data: TRespounse<TCategoryObjectVM> = response.data;
		yield* put(categoryObjectClientOnlyActions.upsertMany(data.rows));
	} catch (error) {
		yield* put(categoryObjectClientOnlyActions.stopLoading());
	}
};

export default getCategoryObjectAllListSaga;
