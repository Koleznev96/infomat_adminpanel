import {put, select} from 'typed-redux-saga';
import {AxiosResponse} from 'axios';
import _ from 'lodash';

import {routesClientToServerActions} from '@infomat/core/src/Redux/Routes/Actions/routesClientToServerActions';
import {routesClientOnlyActions} from '@infomat/core/src/Redux/Routes/Actions/routesClientOnlyActions';
import {TRoutesVM} from '@infomat/core/src/Redux/Routes/entityAdapter';
import {TRespounse} from '@infomat/core/src/Types/PartialBy';
import {selectRoutesSizePage} from '@infomat/core/src/Redux/Routes/Selectors/selectRoutesSizePage';
import {selectRoutesCurrentPage} from '@infomat/core/src/Redux/Routes/Selectors/selectRoutesCurrentPage';
import {selectRoutesSearch} from '@infomat/core/src/Redux/Routes/Selectors/selectRoutesSearch';
import {selectRoutesStatus} from '@infomat/core/src/Redux/Routes/Selectors/selectRoutesStatus';
import {routesService} from '@infomat/core/src/Services/Api/routes.service';

const getListSaga = function* ({
	payload: {size, page, search, status},
}: ReturnType<typeof routesClientToServerActions.getList>) {
	try {
		const sizeUp = yield* select(selectRoutesSizePage);
		const pageUp = yield* select(selectRoutesCurrentPage);
		const searchUp = yield* select(selectRoutesSearch);
		const statusUp = yield* select(selectRoutesStatus);
		const response: AxiosResponse = yield routesService.getList({
			size: size ?? sizeUp,
			page: page ?? pageUp,
			search: search ?? searchUp,
			status: _.isUndefined(status) ? statusUp : status,
		});
		const del = size || sizeUp;
		const data: TRespounse<TRoutesVM> = response.data;
		yield* put(routesClientOnlyActions.setTotalPages(Math.ceil(data.total / del)));
		yield* put(routesClientOnlyActions.upsertMany(data.rows));
	} catch (error) {
		yield* put(routesClientOnlyActions.stopLoading());
	}
};

export default getListSaga;
