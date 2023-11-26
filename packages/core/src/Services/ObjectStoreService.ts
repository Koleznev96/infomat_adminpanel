import cuid from 'cuid';

export class ObjectStoreService {
	private static map: Map<string, any> = new Map();

	static set = (data: object, key?: string) => {
		const dataKey = key ?? cuid();

		this.map.set(dataKey, data);

		return dataKey;
	};
	static get = <T extends object>(key: string): T | undefined => this.map.get(key);
	static has = (key: string) => this.map.has(key);
	static delete = (key: string) => this.map.delete(key);
	static pull = <T extends object>(key: string): T | undefined => {
		const value = this.map.get(key);

		if (this.map.has(key)) {
			this.map.delete(key);
		}

		return value;
	};
}
