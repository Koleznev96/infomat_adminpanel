import _ from 'lodash';

import {
	ExtendedAudioBufferSourceNode,
	ExtendedAudioContext,
	ExtendedBrowserWindow,
	INanoPlayer,
} from '@infomat/core/src/Utils/ExtendedBrowserWindow';
import {IAddEventListenerCallback} from '@infomat/core/src/Utils/IAddEventListenerCallback';

interface ILocalFile {
	uri: string;
	type: string;
	name: string;
}

export type TCanAccessWindow = {
	getWindow(): ExtendedBrowserWindow;
};

export type TCanDetectMobile = {
	isMobile(tablet: boolean): boolean;

	isMobileIos(): boolean;
};

export type TCanPlaySound = {
	decodeAndPlay(arrayBuffer: ArrayBuffer): void;

	playDummySound(): ExtendedAudioBufferSourceNode;

	getAudioContext(): ExtendedAudioContext;

	playSound(audioBuffer: AudioBuffer): ExtendedAudioBufferSourceNode;

	createSoundSource(audioBuffer: AudioBuffer): ExtendedAudioBufferSourceNode;
};

export type TCanSendFeedback = {
	getCurrentUrl(): string;

	getUserAgentString(): string;

	getVendor(): string;
};

export type TFocusable = {
	isTabFocused(): boolean;
};

abstract class AbstractUiContainer implements TCanPlaySound, TCanAccessWindow, TFocusable {
	public isOpera = false;
	public isFirefox = false;
	public isSafari = false;
	public isIE = false;
	public isEdge = false;
	public isChrome = false;
	public isEdgeChromium = false;
	public isBlink = false;
	public isRunningOnLinux = false;

	constructor(window: ExtendedBrowserWindow) {
		if (window) {
			const uaString = !!window && window.navigator.userAgent;

			// Opera 8.0+
			this.isOpera = (!!window.opr && !!window.opr.addons) || !!window.opera || _.includes(uaString, ' OPR/');

			// Firefox 1.0+
			this.isFirefox = typeof window.InstallTrigger !== 'undefined';

			// Safari 3.0+ "[object HTMLElementConstructor]"
			this.isSafari =
				(!!window.HTMLElement && /constructor/i.test(window.HTMLElement)) ||
				(function (p) {
					return !_.isUndefined(p) && p.toString() === '[object SafariRemoteNotification]';
				})(!_.isUndefined(window.safari) ? window.safari.pushNotification : undefined) ||
				(_.includes(uaString.toLowerCase(), 'safari') && !_.includes(uaString.toLowerCase(), 'chrome'));

			// Internet Explorer 6-11
			// noinspection PointlessBooleanExpressionJS
			this.isIE = /*@cc_on!@*/ false || !!window.document.documentMode;

			// Edge 20+
			this.isEdge = !this.isIE && !!window.StyleMedia;

			// Chrome 1 - 79
			this.isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

			// Edge (based on chromium) detection
			this.isEdgeChromium = this.isChrome && _.includes(uaString, 'Edg');

			// Blink engine detection
			this.isBlink = (this.isChrome || this.isOpera) && !!window.CSS;

			this.isRunningOnLinux = !!window.navigator.platform && /Linux/.test(window.navigator.platform);
		}
	}

	abstract getAudioContext(): ExtendedAudioContext;

	abstract playDummySound(): ExtendedAudioBufferSourceNode;

	abstract decodeAndPlay(arrayBuffer: ArrayBuffer): void;

	abstract createSoundSource(audioBuffer: AudioBuffer): ExtendedAudioBufferSourceNode;

	abstract playSound(audioBuffer: AudioBuffer): ExtendedAudioBufferSourceNode;

	abstract getWindow(): ExtendedBrowserWindow;

	abstract getNanoPlayer(): INanoPlayer | undefined;

	/**
	 * @link https://developer.apple.com/forums/thread/119186
	 */
	abstract isTablet(): boolean;

	abstract preventZooming(): void;

	protected abstract _preventMouseWheelZooming(event: WheelEvent): void;

	protected abstract _preventPinchZooming(event: Event): void;

	protected abstract _preventTouchZooming(event: TouchEvent): void;

	abstract addEventListener<K extends keyof WindowEventMap>(
		type: K,
		callback: IAddEventListenerCallback<K>,
		options?: boolean | AddEventListenerOptions,
	): void;

	abstract removeEventListener<K extends keyof WindowEventMap>(type: K, callback: IAddEventListenerCallback<K>): void;

	abstract setTimeout(handler: TimerHandler, timeout?: number, ...args: any[]): number;

	abstract clearTimeout(handle?: number): void;

	abstract getVendor(): string;

	abstract getUserAgentString(): string;

	abstract getCurrentUrl(): string;

	abstract getHostName(): string | undefined;

	abstract getSearchString(): string;

	abstract removeSearchParam(param: string): void;

	abstract getHistoryLength(): number;

	abstract redirectIfNeeded(): void;

	abstract getSupportedConstraints(): MediaTrackSupportedConstraints;

	abstract scrollToElement(selector: string): void;

	abstract createObjectURL(file: File | ILocalFile): string;

	abstract isTabFocused(): boolean;

	abstract getCurrentRoute(): string;

	abstract getPlatform(): string;

	abstract getVersion(): string;

	abstract appendFileToFeedbackForm(form: FormData, name: string, file: Blob | string, fileName: string): FormData;

	abstract getApplicationContainer(): HTMLElement | null;
}

export default AbstractUiContainer;
