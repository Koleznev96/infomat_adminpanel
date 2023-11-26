import {InjectionToken} from 'tsyringe';
import _ from 'lodash';

const DIToken: Record<string, InjectionToken> = {
	reduxDispatch: _.uniqueId('reduxDispatch'),
	SelectorCreator: _.uniqueId('SelectorCreator'),
	StoreService: _.uniqueId('StoreService'),
	EnvService: _.uniqueId('EnvService'),
	EnvInterfaceService: _.uniqueId('EnvInterfaceService'),
	UINotificationService: _.uniqueId('UINotificationService'),
	FeatureShowcase: _.uniqueId('FeatureShowcase'),
	FileProcessingService: _.uniqueId('FileProcessingService'),
	globalLogger: _.uniqueId('globalLogger'),
};

export default DIToken;
