import 'reflect-metadata';
import {container, registry} from 'tsyringe';

import AbstractSelectorCreator from '@infomat/core/src/Services/AbstractSelectorCreator';
import AbstractStoreService from '@infomat/core/src/Services/AbstractStoreService';
import DIToken from '@infomat/core/src/BusinessLogic/DIToken';
import EnvInterfaceService from '@infomat/core/src/Services/EnvInterfaceService';
import AbstractFileProcessingService from '@infomat/core/src/Services/AbstractFileProcessingService';

@registry([
	{
		token: DIToken.EnvInterfaceService,
		useToken: EnvInterfaceService,
	},
])
class ServiceFactory {
	static get selectorCreator(): AbstractSelectorCreator {
		return container.resolve(DIToken.SelectorCreator);
	}

	static get store(): AbstractStoreService {
		return container.resolve(DIToken.StoreService);
	}

	static get env(): EnvInterfaceService {
		return container.resolve(DIToken.EnvInterfaceService);
	}

	static get fileProcessing(): AbstractFileProcessingService {
		return container.resolve(DIToken.FileProcessingService);
	}
}

export default ServiceFactory;
