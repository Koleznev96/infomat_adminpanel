type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type TRespounse<T> = {
	rows: T[];
	total: number;
};

export type TRespounseData<T> = {
	data: T;
	error: {
		details: string;
		field: string;
	}[];
};
