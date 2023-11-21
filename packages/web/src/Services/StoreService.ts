import 'reflect-metadata';
import store from 'store2';
import {container, singleton} from 'tsyringe';
import _ from 'lodash';

import AbstractStoreService, {IStoreOptions} from '@infomat/core/src/Services/AbstractStoreService';
import EnumStoreType from '@infomat/core/src/BusinessLogic/EnumStoreType';
import DIToken from '@infomat/core/src/BusinessLogic/DIToken';
import riseEmptyStorageError from '@infomat/core/src/Utils/riseEmptyStorageError';

@singleton()
class StoreService extends AbstractStoreService {
	async get(key: string, options: IStoreOptions = {storeType: EnumStoreType.LOCAL}): Promise<string | null> {
		const item = store[options.storeType].get(key);
		if (!_.isString(item)) {
			return item;
		}
		const parsedItem = _.attempt(() => JSON.parse(item));
		if (_.isError(parsedItem)) {
			return item;
		}
		return parsedItem;
	}

	set<V = any>(key: string, value: V, options: IStoreOptions = {storeType: EnumStoreType.LOCAL}): Promise<any> {
		if (_.isUndefined(value)) {
			return new Promise((_resolve, reject) => reject(riseEmptyStorageError(key)));
		}

		return new Promise((resolve) => resolve(store[options.storeType].set(key, value)));
	}

	remove(key: string, options: IStoreOptions = {storeType: EnumStoreType.LOCAL}): Promise<any> {
		return new Promise((resolve) => resolve(store[options.storeType].remove(key)));
	}
}

container.register(DIToken.StoreService, {useToken: StoreService});

export default StoreService;
