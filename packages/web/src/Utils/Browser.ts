import 'reflect-metadata';
import _ from 'lodash';
import {container, singleton, registry, inject} from 'tsyringe';

import ServiceFactory from '@infomat/core/src/Services/ServiceFactory';
import AbstractUiContainer from '@infomat/core/src/Services/AbstractUiContainer';
import {
	ExtendedAudioBufferSourceNode,
	ExtendedAudioContext,
	INanoPlayer,
	MediaCapabilitiesInfo,
	MediaEncodingConfiguration,
} from '@infomat/core/src/Utils/ExtendedBrowserWindow';
import {IAddEventListenerCallback} from '@infomat/core/src/Utils/IAddEventListenerCallback';
import DIToken from '@infomat/core/src/BusinessLogic/DIToken';

export enum EnumSupportedMediaType {
	VIDEO = 'video',
	AUDIO = 'audio',
}

export type TExtendedBrowserWindow = Window & {
	AudioContext: ExtendedAudioContext;
	webkitAudioContext: AudioContext & {
		new (contextOptions?: AudioContextOptions): ExtendedAudioContext;
	};
	navigator: Navigator & {
		mediaCapabilities?: {
			encodingInfo?: (config: MediaEncodingConfiguration) => Promise<MediaCapabilitiesInfo>;
		};
	};
	NanoPlayer?: INanoPlayer;
	RTCRtpSender: typeof RTCRtpSender;
	URL: typeof URL;
};

/**
 * @link https://stackoverflow.com/a/9851769/1847769
 */
@registry([
	{
		token: 'globalUiContainer',
		useValue: window as unknown as TExtendedBrowserWindow,
	},
])
@singleton()
class Browser extends AbstractUiContainer {
	private audioContext!: ExtendedAudioContext;

	constructor(@inject('globalUiContainer') protected readonly window: TExtendedBrowserWindow) {
		super(window);

		this.redirectIfNeeded = this.redirectIfNeeded.bind(this);
		this.getSupportedConstraints = this.getSupportedConstraints.bind(this);
	}

	getAudioContext() {
		if (_.isUndefined(this.audioContext) || this.audioContext.state === 'closed') {
			this.audioContext = new (this.window.AudioContext || this.window.webkitAudioContext)();
		}

		return this.audioContext;
	}

	playDummySound() {
		const buffer = this.getAudioContext().createBuffer(1, 1, 22050);
		return this.playSound(buffer);
	}

	decodeAndPlay(arrayBuffer: ArrayBuffer) {
		const context = this.getAudioContext();
		const callback = () =>
			context.decodeAudioData(
				arrayBuffer,
				(audioBuffer) => audioBuffer && this.playSound(audioBuffer),
				ServiceFactory.logService.error,
			);

		if (context?.state === 'suspended') {
			context.resume().then(callback);
		} else {
			callback();
		}
	}

	createSoundSource(audioBuffer: AudioBuffer): ExtendedAudioBufferSourceNode {
		const context = this.getAudioContext();
		const source = context.createBufferSource();

		const endedListener = () => {
			// console.log(new Date().getTime(), '9 - sound play ended');
		};

		source.addEventListener('ended', endedListener);
		source.buffer = audioBuffer;
		source.connect(context.destination);

		return source;
	}

	playSound(audioBuffer: AudioBuffer): ExtendedAudioBufferSourceNode {
		let source: ExtendedAudioBufferSourceNode | undefined = undefined;

		try {
			const context = this.getAudioContext();
			source = context.createBufferSource();

			const endedListener = () => {
				source?.removeEventListener('ended', endedListener);
				source?.disconnect();
			};

			source.addEventListener('ended', endedListener);
			source.buffer = audioBuffer;
			source.connect(context.destination);

			if (source.start) {
				source.start(0);
			} else if (source.noteOn) {
				source.noteOn(0);
			}
		} catch (error) {
			ServiceFactory.logService.error(error, {source});

			throw error;
		}

		return source;
	}

	// @deprecated Please, create own getters/setters for uiContainer instead
	getWindow() {
		return this.window;
	}

	getNanoPlayer(): INanoPlayer | undefined {
		return this.window.NanoPlayer;
	}

	/**
	 * @link https://developer.apple.com/forums/thread/119186
	 */
	isTablet() {
		return this.window.navigator.maxTouchPoints === 5;
	}

	preventZooming() {
		this.window.addEventListener('keydown', this._preventShortCutZooming, true);
		this.window.addEventListener('wheel', this._preventMouseWheelZooming, {passive: false, capture: true});
		this.window.addEventListener('MSGestureStart', this._preventPinchZooming, {passive: false, capture: true});
		this.window.addEventListener('touchstart', this._preventTouchZooming, {passive: false, capture: true});
	}

	private _preventShortCutZooming(event: KeyboardEvent) {
		const keyCodes = [
			187, // Equal Key
			189, // Minus Key
			107, // Num Key  +
			109, // Num Key  -
			173, // Min Key  hyphen/underscor Hey
			61, // Plus key  +/= key
		];

		if ((event.ctrlKey || event.metaKey) && _.includes(keyCodes, event.keyCode)) {
			event.preventDefault();
		}
	}

	protected _preventMouseWheelZooming(event: WheelEvent) {
		if (event.ctrlKey) {
			event.preventDefault();
		}
	}

	protected _preventPinchZooming(event: Event) {
		event.preventDefault();
	}

	protected _preventTouchZooming(event: TouchEvent) {
		if (_.size(event.touches) > 1) {
			event.preventDefault();
		}
	}

	addEventListener<K extends keyof WindowEventMap>(
		type: K,
		callback: IAddEventListenerCallback<K>,
		options?: boolean | AddEventListenerOptions,
	) {
		this.window.addEventListener<K>(type, callback, options);
	}

	removeEventListener<K extends keyof WindowEventMap>(type: K, callback: IAddEventListenerCallback<K>) {
		this.window.removeEventListener<K>(type, callback);
	}

	setTimeout(handler: TimerHandler, timeout?: number, ...args: unknown[]) {
		return this.window.setTimeout(handler, timeout, ...args);
	}

	clearTimeout(handle?: number) {
		this.window.clearTimeout(handle);
	}

	getVendor() {
		return this.window.navigator.vendor;
	}

	getUserAgentString() {
		return this.window.navigator.userAgent;
	}

	getCurrentUrl() {
		return this.window.location.href + this.window.location.pathname + this.window.location.search;
	}

	getHostName() {
		return this.window.location.hostname;
	}

	getSearchString() {
		return this.window.location.search;
	}

	removeSearchParam(param: string) {
		const searchParams = new URLSearchParams(this.getSearchString());

		searchParams.delete(param);

		const searchString = searchParams.toString() ?? '';
		const newURL = _.isEmpty(searchString)
			? this.window.location.pathname
			: `${this.window.location.pathname}?${searchString}`;

		this.window.history.replaceState(this.window.history.state || {}, this.window.document.title, newURL);
	}

	getHistoryLength() {
		return this.window.history.length;
	}

	redirectIfNeeded() {
		if (ServiceFactory.env.shouldRedirect(this.window.location.hostname)) {
			this.window.location.replace(
				'https://' + ServiceFactory.env.getDomain() + this.window.location.pathname + this.window.location.search,
			);
		}
	}

	getSupportedConstraints(): MediaTrackSupportedConstraints {
		if (
			!_.isUndefined(this.window.navigator.mediaDevices) &&
			_.isFunction(this.window.navigator.mediaDevices.getSupportedConstraints)
		) {
			return this.window.navigator.mediaDevices.getSupportedConstraints();
		}

		return {};
	}

	scrollToElement(selector: string) {
		const element = this.window.document.querySelector(selector);

		if (element) {
			element.scrollIntoView(false);
		}
	}

	createObjectURL(file: File) {
		return this.window.URL.createObjectURL(file);
	}

	isTabFocused(): boolean {
		return this.window.document.visibilityState === 'visible';
	}

	getCurrentRoute(): string {
		return this.getCurrentUrl();
	}

	getPlatform(): string {
		return this.getVendor();
	}

	getVersion(): string {
		return this.getUserAgentString();
	}

	appendFileToFeedbackForm(form: FormData, name: string, file: Blob | string, fileName: string): FormData {
		if (_.isString(file)) {
			form.append(name, file);
		} else {
			form.append(name, file, fileName);
		}

		return form;
	}

	getApplicationContainer(): HTMLElement | null {
		return this.getWindow().document.querySelector('#bodycontainer');
	}
}

container.register<AbstractUiContainer>(DIToken.UiContainer, {useToken: Browser});

export default Browser;
