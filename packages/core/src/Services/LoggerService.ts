import 'reflect-metadata';
import {container, inject, registry, singleton} from 'tsyringe';

import DIToken from '@infomat/core/src/BusinessLogic/DIToken';
import type EnvInterfaceService from '@infomat/core/src/Services/EnvInterfaceService';

@registry([
	{
		token: DIToken.globalLogger,
		useValue: console,
	},
])
@singleton()
class LoggerService implements Partial<Console> {
	constructor(
		@inject(DIToken.EnvInterfaceService) private env: EnvInterfaceService,
		@inject(DIToken.globalLogger) private logger: Console,
	) {}

	/**
	 * @description use this method to print in console in Dev mode
	 * @warn Other methods will be available in Prod mode
	 */
	debug(...args: Parameters<Console['debug']>) {
		this.env.notProduction() && this.logger.debug(...args);
	}

	log(...args: Parameters<Console['log']>) {
		this.logger.log(...args);
	}

	warn(...args: Parameters<Console['warn']>) {
		this.logger.warn(...args);
	}

	info(...args: Parameters<Console['info']>) {
		this.logger.info(...args);
	}

	error(...args: Parameters<Console['error']>) {
		this.logger.error(...args);
	}

	group(...args: Parameters<Console['group']>) {
		this.logger.group(...args);
	}

	groupEnd() {
		this.logger.groupEnd();
	}

	table(...args: Parameters<Console['table']>) {
		this.logger.table(...args);
	}
}

container.register<LoggerService>(DIToken.loggerService, {useToken: LoggerService});

export {LoggerService};
