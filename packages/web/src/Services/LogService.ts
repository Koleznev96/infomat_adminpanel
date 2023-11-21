import 'reflect-metadata';
import Rollbar from 'rollbar';
import {container, inject, registry, singleton} from 'tsyringe';

import DIToken from '@infomat/core/src/BusinessLogic/DIToken';
import AbstractUiContainer from '@infomat/core/src/Services/AbstractUiContainer';
import EnvInterfaceService from '@infomat/core/src/Services/EnvInterfaceService';
import ILogService, {TLogModelInfo} from '@infomat/core/src/Services/ILogService';
import {
	IAbstractRollbarImplementation,
	RollbarCallback,
	RollbarLogArgument,
} from '@infomat/core/src/Services/Rollbar/IAbstractLogResult';
import EnumEnvironment from '@infomat/core/src/EnumEnvironment';

@registry([
	{
		token: DIToken.globalLogger,
		useValue: console,
	},
])
@singleton()
class LogService implements ILogService {
	constructor(
		@inject(DIToken.EnvInterfaceService) protected env: EnvInterfaceService,
		@inject(DIToken.UiContainer) protected uiContainer: AbstractUiContainer,
		@inject(DIToken.globalLogger) private consoleLogger: Console,
	) {
		this.initialize();
	}

	private instance?: IAbstractRollbarImplementation = undefined;

	private initialize() {
		this.instance = new Rollbar(this.getConfigOptions());
	}

	private get envName() {
		return this.env.isProduction() && this.uiContainer.getCurrentUrl().includes(this.env.getStageHostName())
			? EnumEnvironment.STAGE
			: this.env.getEnvName();
	}

	private getConfigOptions = (): Rollbar.Configuration => ({
		accessToken: this.env.getRollbarAccessToken(),
		captureUncaught: true,
		captureUnhandledRejections: true,
		captureIp: 'anonymize',
		logLevel: 'debug',
		reportLevel: 'error',
		enabled: this.env.isProduction(),
		host: this.uiContainer.getHostName(),
		environment: this.envName,
		// this part is copied from VXinfomat as it shows code version
		payload: {
			environment: this.envName,
			client: {
				javascript: {
					source_map_enabled: true,
					guess_uncaught_frames: true,
					code_version: this.env.getVersion(),
				},
			},
		},
	});

	critical(args: unknown, extra?: any, callback?: RollbarCallback): void {
		if (this.env.notProduction()) {
			this.consoleLogger.error(args, extra);
		}

		this.instance?.critical(args as RollbarLogArgument, extra);
	}

	error(args: unknown, extra?: any, callback?: RollbarCallback): void {
		if (this.env.notProduction()) {
			this.consoleLogger.error(args, extra);
		}

		this.instance?.error(args as RollbarLogArgument, extra);
	}

	debug(args: unknown, extra?: any, callback?: RollbarCallback): void {
		if (this.env.notProduction()) {
			this.consoleLogger.debug(args, extra);
		}

		this.instance?.debug(args as RollbarLogArgument, extra);
	}

	warn(args: unknown, extra?: any, callback?: RollbarCallback): void {
		if (this.env.notProduction()) {
			this.consoleLogger.warn(args, extra);
		}

		this.instance?.warning(args as RollbarLogArgument, extra);
	}

	warning(args: unknown, extra?: any, callback?: RollbarCallback): void {
		if (this.env.notProduction()) {
			this.consoleLogger.warn(args, extra);
		}

		this.instance?.warning(args as RollbarLogArgument, extra);
	}

	log(args: unknown, extra?: any, callback?: RollbarCallback): void {
		if (this.env.notProduction()) {
			this.consoleLogger.log(args, extra);
		}

		this.instance?.log(args as RollbarLogArgument, extra);
	}

	info(args: unknown, extra?: any, callback?: RollbarCallback): void {
		if (this.env.notProduction()) {
			this.consoleLogger.info(args, extra);
		}

		this.instance?.info(args as RollbarLogArgument, extra);
	}

	setModelInfo(info: TLogModelInfo): void {
		if (this.env.notProduction()) {
			this.consoleLogger.info('Model info:', info);
		}

		this.instance?.configure(info);
	}
}

container.register(DIToken.LogService, {useToken: LogService});

export default LogService;
