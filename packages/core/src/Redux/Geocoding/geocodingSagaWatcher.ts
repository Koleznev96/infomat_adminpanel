import {takeEvery} from 'typed-redux-saga';
import searchForGeocodingSaga from './Sagas/searchForGeocodingSaga';
import {geocodingClientToServerActions} from './Actions/geocodingClientToServerActions';
import searchForKeywordSaga from './Sagas/searchForKeywordSaga';

function* geocodingSagaWatcher() {
	yield* takeEvery(geocodingClientToServerActions.getAddress.type, searchForGeocodingSaga);
	yield* takeEvery(geocodingClientToServerActions.getGeocoding.type, searchForKeywordSaga);
}

export default geocodingSagaWatcher;
