declare module 'string.prototype.replaceall' {
	const replaceAll: (where: string, search: string, replace: string) => string;

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	replaceAll.shim = () => {};

	export default replaceAll;
}
