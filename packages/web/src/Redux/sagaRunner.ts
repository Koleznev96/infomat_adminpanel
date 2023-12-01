import {fork} from 'typed-redux-saga';

import startRootSaga from '@infomat/core/src/Redux/startRootSaga';
import sagaMiddleware from '@infomat/core/src/Middleware/sagaMiddleware';
import geocodingSagaWatcher from '@infomat/core/src/Redux/Geocoding/geocodingSagaWatcher';
import userSagaWatcher from '@infomat/core/src/Redux/User/userSagaWatcher';
import categoryObjectSagaWatcher from '@infomat/core/src/Redux/CategoryObject/categoryObjectSagaWatcher';
import notificationsSagaWatcher from '@infomat/core/src/Redux/Notifications/notificationsSagaWatcher';
import informationSagaWatcher from '@infomat/core/src/Redux/Information/informationSagaWatcher';
import subcategoryObjectSagaWatcher from '@infomat/core/src/Redux/SubcategoryObject/subcategoryObjectSagaWatcher';
import placesSagaWatcher from '@infomat/core/src/Redux/Places/placesSagaWatcher';
import eventsSagaWatcher from '@infomat/core/src/Redux/Events/eventsSagaWatcher';
import routesSagaWatcher from '@infomat/core/src/Redux/Routes/routesSagaWatcher';
import specialPlacesSagaWatcher from '@infomat/core/src/Redux/SpecialPlace/specialPlacesSagaWatcher';

import routingSagaWatcher from './Routing/routingSagaWatcher';

/**
 * @link https://words.thisishugo.com/how-to-pass-an-api-client-to-a-redux-saga-f35170356c53
 * @constructor
 */
function* rootSaga() {
	yield* fork(geocodingSagaWatcher);
	yield* fork(userSagaWatcher);
	yield* fork(routingSagaWatcher);
	yield* fork(categoryObjectSagaWatcher);
	yield* fork(notificationsSagaWatcher);
	yield* fork(informationSagaWatcher);
	yield* fork(subcategoryObjectSagaWatcher);
	yield* fork(placesSagaWatcher);
	yield* fork(eventsSagaWatcher);
	yield* fork(routesSagaWatcher);
	yield* fork(specialPlacesSagaWatcher);
}

const sagaRunner = startRootSaga(sagaMiddleware, rootSaga);

export default sagaRunner;
