import {takeEvery} from 'typed-redux-saga';
import searchForGeocodingSaga from './Sagas/searchForGeocodingSaga';
import {geocodingClientToServerActions} from './Actions/geocodingClientToServerActions';
import searchForKeywordSaga from './Sagas/searchForKeywordSaga';
import searchForGeocodingDragendSaga from './Sagas/searchForGeocodingDragendSaga';

function* geocodingSagaWatcher() {
	yield* takeEvery(geocodingClientToServerActions.getAddress.type, searchForGeocodingSaga);
	yield* takeEvery(geocodingClientToServerActions.getGeocoding.type, searchForKeywordSaga);
	yield* takeEvery(geocodingClientToServerActions.getAddressDragend, searchForGeocodingDragendSaga);
}

export default geocodingSagaWatcher;
