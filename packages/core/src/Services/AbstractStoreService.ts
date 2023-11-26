import EnumStoreType from '@infomat/core/src/BusinessLogic/EnumStoreType';

export interface IStoreOptions {
	storeType: EnumStoreType;
}

abstract class AbstractStoreService {
	abstract get(key: string, options: IStoreOptions): Promise<any>;
	abstract set(key: string, value: any, options?: IStoreOptions): Promise<any>;
	abstract remove(key: string, options?: IStoreOptions): Promise<any>;
}

export default AbstractStoreService;
