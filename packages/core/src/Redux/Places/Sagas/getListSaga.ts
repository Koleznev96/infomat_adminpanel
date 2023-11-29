import {put, select} from 'typed-redux-saga';
import {AxiosResponse} from 'axios';
import _ from 'lodash';

import {placesClientToServerActions} from '@infomat/core/src/Redux/Places/Actions/placesClientToServerActions';
import {placesClientOnlyActions} from '@infomat/core/src/Redux/Places/Actions/placesClientOnlyActions';
import {TPlacesVM} from '@infomat/core/src/Redux/Places/entityAdapter';
import {TRespounse} from '@infomat/core/src/Types/PartialBy';
import {selectPlacesSizePage} from '@infomat/core/src/Redux/Places/Selectors/selectPlacesSizePage';
import {selectPlacesCurrentPage} from '@infomat/core/src/Redux/Places/Selectors/selectPlacesCurrentPage';
import {selectPlacesSearch} from '@infomat/core/src/Redux/Places/Selectors/selectPlacesSearch';
import {selectPlacesStatus} from '@infomat/core/src/Redux/Places/Selectors/selectPlacesStatus';
import {selectPlacesRecommendedOnly} from '@infomat/core/src/Redux/Places/Selectors/selectPlacesRecommendedOnly';
import {placesService} from '@infomat/core/src/Services/Api/places.service';
import {selectPlacesSubcategoryId} from '@infomat/core/src/Redux/Places/Selectors/selectPlacesSubcategoryId';

const getListSaga = function* ({
	payload: {size, page, search, status, recommendedOnly, subcategoryId},
}: ReturnType<typeof placesClientToServerActions.getList>) {
	try {
		const sizeUp = yield* select(selectPlacesSizePage);
		const pageUp = yield* select(selectPlacesCurrentPage);
		const searchUp = yield* select(selectPlacesSearch);
		const statusUp = yield* select(selectPlacesStatus);
		const recommendedOnlyUp = yield* select(selectPlacesRecommendedOnly);
		const subcategoryIdUp = yield* select(selectPlacesSubcategoryId);
		const response: AxiosResponse = yield placesService.getList({
			size: size ?? sizeUp,
			page: page ?? pageUp,
			search: search ?? searchUp,
			status: _.isUndefined(status) ? statusUp : status,
			recommendedOnly: _.isUndefined(recommendedOnly) ? recommendedOnlyUp : recommendedOnly,
			subcategoryId: _.isUndefined(subcategoryId) ? subcategoryIdUp : subcategoryId,
		});
		const del = size || sizeUp;
		const data: TRespounse<TPlacesVM> = response.data;
		yield* put(placesClientOnlyActions.setTotalPages(Math.ceil(data.total / del)));
		yield* put(placesClientOnlyActions.upsertMany(data.rows));
	} catch (error) {
		yield* put(placesClientOnlyActions.stopLoading());
	}
};

export default getListSaga;
