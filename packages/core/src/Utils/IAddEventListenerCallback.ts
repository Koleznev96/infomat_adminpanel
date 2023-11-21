export interface IAddEventListenerCallback<K extends keyof WindowEventMap> {
	(this: Window, ev: WindowEventMap[K]): any;
}
