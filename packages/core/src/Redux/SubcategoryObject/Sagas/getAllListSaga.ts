import {put} from 'typed-redux-saga';
import {AxiosResponse} from 'axios';

import {subcategoryObjectClientOnlyActions} from '@infomat/core/src/Redux/SubcategoryObject/Actions/subcategoryObjectClientOnlyActions';
import {subcategoryObject} from '@infomat/core/src/Services/Api/subcategoryObject.service';
import {TSubcategoryObjectVM} from '@infomat/core/src/Redux/SubcategoryObject/entityAdapter';
import {TRespounse} from '@infomat/core/src/Types/PartialBy';

const getAllListSaga = function* () {
	try {
		const response: AxiosResponse = yield subcategoryObject.getList({
			size: 100,
			page: 0,
		});
		const data: TRespounse<TSubcategoryObjectVM> = response.data;
		yield* put(subcategoryObjectClientOnlyActions.upsertMany(data.rows));
	} catch (error) {
		yield* put(subcategoryObjectClientOnlyActions.stopLoading());
	}
};

export default getAllListSaga;
