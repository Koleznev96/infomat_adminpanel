export interface VideoConfiguration {
	contentType: string;
	width: number;
	height: number;
	bitrate: number;
	framerate: number;
}

export interface AudioConfiguration {
	contentType: string;
	channels: number;
	bitrate: number;
	samplerate?: number;
}

export enum EnumMediaEncodingConfigurationType {
	RECORD = 'record',
	TRANSMISSION = 'transmission',
}

export enum MediaEncodingConfigurationKey {
	VIDEO = 'video',
	AUDIO = 'audio',
}

export interface MediaEncodingConfiguration {
	type: EnumMediaEncodingConfigurationType;
	[MediaEncodingConfigurationKey.VIDEO]?: VideoConfiguration;
	[MediaEncodingConfigurationKey.AUDIO]?: AudioConfiguration;
}

export interface ExtendedAudioBufferSourceNode extends AudioBufferSourceNode {
	PLAYING_STATE?: 1;
	FINISHED_STATE?: 3;
	noteOn?: ExtendedAudioBufferSourceNode['start'];
	playbackState?: ExtendedAudioBufferSourceNode['PLAYING_STATE'] | ExtendedAudioBufferSourceNode['FINISHED_STATE'];
}

export interface MediaCapabilitiesInfo {
	powerEfficient: boolean;
	smooth: boolean;
	supported: boolean;
}

export interface ExtendedAudioContext extends AudioContext {
	prototype?: ExtendedAudioContext;

	// TODO
	// eslint-disable-next-line @typescript-eslint/no-misused-new
	new (contextOptions?: AudioContextOptions): ExtendedAudioContext;

	createBufferSource(): ExtendedAudioBufferSourceNode;
}

export interface INanoPlayerConfigEntry {
	h5live: {
		rtmp: {
			appUrl: string;
			streamName: string;
			streamname: string;
			url: string;
		};
		token: string;
		securityToken: string;
		server: {
			hls: string;
			progressive: string;
			websocket: string;
		};
		metrics: {
			id: string;
			key: string;
		};
	};
}

export interface INanoPlayerErrorEvent {
	name: string;
	player: string;
	id: string;
	version: string;
	data: {
		code: number; // @link https://demo.nanocosmos.de/nanoplayer/docs/nanoplayer/NanoPlayer.html#~errorcode
		message: string;
	};
	state: number; // @link https://demo.nanocosmos.de/nanoplayer/docs/nanoplayer/NanoPlayer.html#~state
}

export interface INanoPlayerConfig {
	source: {
		entries: INanoPlayerConfigEntry[];
	};
	playback: {
		autoplay: boolean;
		automute: boolean;
		muted: boolean;
		forceTech: string;
		flashplayer: string;
	};
	style: {
		controls: boolean;
		displayMutedAutoplay: boolean;
		height: string;
		width: string;
		aspectratio: string;
	};
	events: Partial<{
		onReady: Function;
		onPlay: Function;
		onLoading: Function;
		onError: (event: INanoPlayerErrorEvent) => void;
	}>;
}

/**
 * @link https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_api
 */
export interface INanoPlayer {
	// TODO
	// eslint-disable-next-line @typescript-eslint/no-misused-new
	new (playerDivId: string): INanoPlayer;

	/**
	 * @link https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_api#nanoplayersetupconfig
	 */
	setup(config: INanoPlayerConfig): Promise<INanoPlayerConfig>;

	/**
	 * @link https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_api#nanoplayermute
	 */
	mute(): void;

	/**
	 * @link https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_api#nanoplayerunmute
	 */
	unmute(): void;

	/**
	 * @link https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_api#nanoplayerupdatesourcesource
	 */
	updateSource(newSource: Partial<INanoPlayerConfig['source']>): Promise<INanoPlayerConfig>;

	/**
	 * @link https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_api#nanoplayerdestroy
	 */
	destroy(): void;
}

interface IExtendedDocument extends Document {
	documentMode?: unknown;
}

// @ts-ignore
export interface ExtendedBrowserWindow extends Window, globalThis {
	opr?: {
		addons?: unknown;
	};
	opera?: unknown;
	InstallTrigger?: unknown;
	HTMLElement?: string;
	safari?: {
		pushNotification?: {
			toString(): string;
		};
	};
	StyleMedia?: unknown;
	chrome?: {
		runtime?: unknown;
		webstore?: unknown;
	};
	CSS?: unknown;
	AudioContext: ExtendedAudioContext;
	webkitAudioContext: AudioContext & {
		new (contextOptions?: AudioContextOptions): ExtendedAudioContext;
	};
	document: IExtendedDocument;
	navigator: Navigator & {
		mediaCapabilities?: {
			encodingInfo?: (config: MediaEncodingConfiguration) => Promise<MediaCapabilitiesInfo>;
		};
	};
	NanoPlayer?: {
		new (selector: string): INanoPlayer;
	};
}
