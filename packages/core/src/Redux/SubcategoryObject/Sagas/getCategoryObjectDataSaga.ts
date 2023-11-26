import {put} from 'typed-redux-saga';
import {AxiosResponse} from 'axios';

import {subcategoryObjectClientToServerActions} from '@infomat/core/src/Redux/SubcategoryObject/Actions/subcategoryObjectClientToServerActions';
import {subcategoryObjectClientOnlyActions} from '@infomat/core/src/Redux/SubcategoryObject/Actions/subcategoryObjectClientOnlyActions';
import {TRespounseData} from '@infomat/core/src/Types/PartialBy';
import {TSubcategoryObjectVM} from '@infomat/core/src/Redux/SubcategoryObject/entityAdapter';
import {subcategoryObject} from '@infomat/core/src/Services/Api/subcategoryObject.service';

const getCategoryObjectDataSaga = function* ({payload}: ReturnType<typeof subcategoryObjectClientToServerActions.get>) {
	try {
		const response: AxiosResponse = yield subcategoryObject.getItem(payload);
		const data: TRespounseData<TSubcategoryObjectVM> = response.data;
		yield* put(subcategoryObjectClientOnlyActions.setData(data.data));
	} catch (error) {
		yield* put(subcategoryObjectClientOnlyActions.stopLoading());
	}
};

export default getCategoryObjectDataSaga;
