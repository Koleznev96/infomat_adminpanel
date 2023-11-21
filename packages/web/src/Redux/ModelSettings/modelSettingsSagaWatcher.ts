import {takeEvery} from 'typed-redux-saga';

import {modelSettingsClientOnlyActions} from '@infomat/core/src/Redux/ModelSettings/Actions/modelSettingsClientOnlyActions';

import {saveHeatmapSettingsSaga} from 'src/Redux/ModelSettings/Sagas/saveHeatmapSettingsSaga';
import {saveVideoChatSettingsSaga} from 'src/Redux/ModelSettings/Sagas/saveVideoChatSettingsSaga';

function* modelSettingsSagaWatcher() {
	yield* takeEvery(modelSettingsClientOnlyActions.saveHeatmapSettings.type, saveHeatmapSettingsSaga);
	yield* takeEvery(modelSettingsClientOnlyActions.saveVideoChatSettings.type, saveVideoChatSettingsSaga);
}

export default modelSettingsSagaWatcher;
