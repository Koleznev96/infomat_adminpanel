import {put, select} from 'typed-redux-saga';
import {AxiosResponse} from 'axios';
import _ from 'lodash';

import {specialPlacesClientToServerActions} from '@infomat/core/src/Redux/SpecialPlace/Actions/specialPlacesClientToServerActions';
import {specialPlacesClientOnlyActions} from '@infomat/core/src/Redux/SpecialPlace/Actions/specialPlacesClientOnlyActions';
import {TSpecialPlaceVM} from '@infomat/core/src/Redux/SpecialPlace/entityAdapter';
import {TRespounse} from '@infomat/core/src/Types/PartialBy';
import {selectSpecialPlacesSizePage} from '@infomat/core/src/Redux/SpecialPlace/Selectors/selectSpecialPlacesSizePage';
import {selectSpecialPlacesCurrentPage} from '@infomat/core/src/Redux/SpecialPlace/Selectors/selectSpecialPlacesCurrentPage';
import {selectSpecialPlacesSearch} from '@infomat/core/src/Redux/SpecialPlace/Selectors/selectSpecialPlacesSearch';
import {specialPlacesService} from '@infomat/core/src/Services/Api/specialPlaces.service';
import {selectSpecialPlacesType} from '@infomat/core/src/Redux/SpecialPlace/Selectors/selectSpecialPlacesType';

const getListSaga = function* ({
	payload: {size, page, search, type},
}: ReturnType<typeof specialPlacesClientToServerActions.getList>) {
	try {
		const sizeUp = yield* select(selectSpecialPlacesSizePage);
		const pageUp = yield* select(selectSpecialPlacesCurrentPage);
		const searchUp = yield* select(selectSpecialPlacesSearch);
		const typeUp = yield* select(selectSpecialPlacesType);
		const response: AxiosResponse = yield specialPlacesService.getList({
			size: size ?? sizeUp,
			page: page ?? pageUp,
			search: search ?? searchUp,
			type: _.isUndefined(type) ? typeUp : type,
		});
		const del = size || sizeUp;
		const data: TRespounse<TSpecialPlaceVM> = response.data;
		yield* put(specialPlacesClientOnlyActions.setTotalPages(Math.ceil(data.total / del)));
		yield* put(specialPlacesClientOnlyActions.upsertMany(data.rows));
	} catch (error) {
		yield* put(specialPlacesClientOnlyActions.stopLoading());
	}
};

export default getListSaga;
