export interface IAbstractLogResult {
	uuid: string;
}

export type RollbarMaybeError = Error | undefined | null;
export type RollbarCallback = (err: RollbarMaybeError, response?: object) => void;

export type RollbarLogArgument = string | Error | object | RollbarCallback | Date | any[];

export interface IAbstractRollbarImplementation {
	critical(args: RollbarLogArgument, extra?: any): IAbstractLogResult;

	debug(args: RollbarLogArgument, extra?: any): IAbstractLogResult;

	info(args: RollbarLogArgument, extra?: any): IAbstractLogResult;

	error(args: RollbarLogArgument, extra?: any): IAbstractLogResult;

	log(args: RollbarLogArgument, extra?: any): IAbstractLogResult;

	warning(args: RollbarLogArgument, extra?: any): IAbstractLogResult;

	configure(args: RollbarLogArgument): void;
}
