import 'reflect-metadata';
import {inject, singleton} from 'tsyringe';
import {chain, get, includes, isEmpty, isString, isBoolean} from 'lodash';

import DIToken from '@infomat/core/src/BusinessLogic/DIToken';
import AbstractEnvService from '@infomat/core/src/Services/AbstractEnvService';
import EnumEnvironment from '@infomat/core/src/EnumEnvironment';

export enum EnumBooleanStringified {
	TRUE = 'true',
	FALSE = 'false',
}

export enum EnumBooleanDigitized {
	FALSE = '0',
	TRUE = '1',
}

export const parseBoolean = (value: boolean | EnumBooleanStringified | string | undefined) => {
	if (isBoolean(value)) {
		return value;
	}

	return includes([EnumBooleanDigitized.TRUE, EnumBooleanStringified.TRUE], value);
};

/**
 * @note this is how infomat does it
 * @link http://phabricator.y/diffusion/23/browse/master/src/services/ApiService.ts
 */

@singleton()
class EnvInterfaceService {
	private readonly _env: Record<string, string | undefined> = {};

	constructor(@inject(DIToken.EnvService) envService: AbstractEnvService) {
		this._env = envService.getAll();
	}

	getURLApi = (): string => get(this._env, 'REACT_APP_URL_API', 'https://5f8104486938.vps.myjino.ru/api');

	getVersion = (): string => get(this._env, 'REACT_APP_VERSION', '2.0.0');

	getName = (): string => get(this._env, 'REACT_APP_NAME', 'infomat');

	isDev = (): boolean => this._env.REACT_APP_ENV === EnumEnvironment.DEV;

	isProduction = (): boolean => this._env.REACT_APP_ENV === EnumEnvironment.PROD;

	notProduction = (): boolean => this._env.REACT_APP_ENV !== EnumEnvironment.PROD;

	reduxDevToolsEnabled = (): boolean =>
		parseBoolean(this._env.REACT_APP_REDUX_DEVTOOLS_ENABLE ?? EnumBooleanStringified.FALSE);

	getReduxIgnoredActions = (): string[] =>
		this._env.REACT_APP_REDUX_IGNORE_ACTIONS ? this._env.REACT_APP_REDUX_IGNORE_ACTIONS.toString().split(',') : [];

	getCookieDomain = (): string => this._env.REACT_APP_COOKIE_DOMAIN || '';

	getDomain = (): string => this._env.REACT_APP_DOMAIN || '';

	getEnvName = (): EnumEnvironment => get(this._env, 'REACT_APP_ENV', EnumEnvironment.PROD) as EnumEnvironment;
	getRollbarAccessToken = (): string => this._env.REACT_APP_ROLLBAR_CLIENT_ACCESS_TOKEN || '';

	isReduxSelectorStatsEnabled = () =>
		parseBoolean(this._env.REACT_APP_ENABLE_REDUX_SELECTOR_STATS ?? EnumBooleanStringified.FALSE);

	getStageHostName = (): string => this._env.REACT_APP_STAGE_HOST_NAME || '';

	isPreviewDomain = (domain: string): boolean =>
		isString(this._env.REACT_APP_PREVIEW_HOST_NAME_SUFFIX) &&
		!isEmpty(this._env.REACT_APP_PREVIEW_HOST_NAME_SUFFIX) &&
		domain.endsWith(this._env.REACT_APP_PREVIEW_HOST_NAME_SUFFIX);

	shouldRedirect = (currentHostname: string): boolean => {
		const domain = this.getDomain();

		return (
			parseBoolean(this._env.REACT_APP_REDIRECT_INVALID_DOMAINS ?? EnumBooleanStringified.FALSE) &&
			this.isProduction() &&
			!isEmpty(domain) &&
			!includes([domain, this.getStageHostName(), 'localhost'], currentHostname) &&
			!this.isPreviewDomain(currentHostname)
		);
	};

	getSnackTimeout = (fallback = '2000') => parseInt(this._env.REACT_APP_SNACK_TIMEOUT ?? fallback, 10);
}

export default EnvInterfaceService;
