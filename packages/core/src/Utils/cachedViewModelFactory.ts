import _ from 'lodash';

type TEmptyDeps = any[];

export default function cachedViewModelFactory<E extends object, M, D extends TEmptyDeps = TEmptyDeps>(
	viewModel: new (entity: E, ...deps: D) => M,
): (entity?: E, deps?: D) => M | undefined {
	const emptyDeps: TEmptyDeps = [];
	const cache = new WeakMap<E, [viewModel: M, deps: D | TEmptyDeps]>();

	return (entity, deps = emptyDeps as D) => {
		if (_.isUndefined(entity)) {
			return undefined;
		}

		const cacheEntry = cache.get(entity) || [];
		const [, cachedDeps] = cacheEntry;
		let [cachedVM] = cacheEntry;

		if (_.isUndefined(cachedVM) || _.xor(cachedDeps, deps).length > 0) {
			cache.set(entity, [new viewModel(entity, ...deps), deps]);
		}

		[cachedVM] = cache.get(entity) || [];

		return cachedVM;
	};
}
