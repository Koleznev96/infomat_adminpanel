import {put} from 'typed-redux-saga';

import {modelSettingsClientToServerActions} from '@infomat/core/src/Redux/ModelSettings/Actions/modelSettingsClientToServerActions';

function* requestModelSettingsSaga() {
	yield* put(modelSettingsClientToServerActions.getModelSettings());
}

export default requestModelSettingsSaga;
