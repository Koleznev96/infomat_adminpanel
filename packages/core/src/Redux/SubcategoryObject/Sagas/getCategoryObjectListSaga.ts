import {put, select} from 'typed-redux-saga';
import {AxiosResponse} from 'axios';

import {subcategoryObjectClientToServerActions} from '@infomat/core/src/Redux/SubcategoryObject/Actions/subcategoryObjectClientToServerActions';
import {subcategoryObjectClientOnlyActions} from '@infomat/core/src/Redux/SubcategoryObject/Actions/subcategoryObjectClientOnlyActions';
import {subcategoryObject} from '@infomat/core/src/Services/Api/subcategoryObject.service';
import {TSubcategoryObjectVM} from '@infomat/core/src/Redux/SubcategoryObject/entityAdapter';
import {TRespounse} from '@infomat/core/src/Types/PartialBy';
import {selectSubcategoryObjectSizePage} from '@infomat/core/src/Redux/SubcategoryObject/Selectors/selectSubcategoryObjectSizePage';
import {selectSubcategoryObjectCurrentPage} from '@infomat/core/src/Redux/SubcategoryObject/Selectors/selectSubcategoryObjectCurrentPage';
import {selectSubcategoryObjectSearch} from '@infomat/core/src/Redux/SubcategoryObject/Selectors/selectSubcategoryObjectSearch';

const getCategoryObjectListSaga = function* ({
	payload: {size, page, search},
}: ReturnType<typeof subcategoryObjectClientToServerActions.getList>) {
	try {
		const sizeUp = yield* select(selectSubcategoryObjectSizePage);
		const pageUp = yield* select(selectSubcategoryObjectCurrentPage);
		const searchUp = yield* select(selectSubcategoryObjectSearch);
		const response: AxiosResponse = yield subcategoryObject.getList({
			size: size ?? sizeUp,
			page: page ?? pageUp,
			search: search ?? searchUp,
		});
		const del = size || sizeUp;
		const data: TRespounse<TSubcategoryObjectVM> = response.data;
		yield* put(subcategoryObjectClientOnlyActions.setTotalPages(Math.ceil(data.total / del)));
		yield* put(subcategoryObjectClientOnlyActions.upsertMany(data.rows));
	} catch (error) {
		yield* put(subcategoryObjectClientOnlyActions.stopLoading());
	}
};

export default getCategoryObjectListSaga;
