import 'reflect-metadata';
import {container, singleton} from 'tsyringe';

import AbstractEnvService from '@infomat/core/src/Services/AbstractEnvService';
import DIToken from '@infomat/core/src/BusinessLogic/DIToken';

@singleton()
class EnvService extends AbstractEnvService {
	getAll() {
		return process.env as Record<string, string>;
	}
}

container.register(DIToken.EnvService, {useToken: EnvService});

export default EnvService;
