export default interface ILogService {
	error(error: any, otherProps?: any): void;
	critical(error: any, otherProps?: any): void;
	warn(info: any, otherProps?: any): void;
	warning(info: any, otherProps?: any): void;
	debug(info: any, otherProps?: any): void;
	log(info: any, otherProps?: any): void;
	info(info: any, otherProps?: any): void;
	setModelInfo(info: any): void;
}

export type TLogModelInfo = {
	login: string;
	sessionId: string;
	userKey: string;
	userId: string;
};
