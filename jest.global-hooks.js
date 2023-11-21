import 'reflect-metadata';
import {container} from 'tsyringe';
import {SupportedLanguage} from 'cmd-control-client-lib';
import {faker} from '@faker-js/faker';
import * as moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import _ from 'lodash';

import DIToken from '@infomat/core/src/BusinessLogic/DIToken';
import EnumWorkMode from '@infomat/core/src/BusinessLogic/EnumWorkMode';
import '@infomat/core/src/Services/ServiceFactory';

momentDurationFormatSetup(moment);

/**
 * @note Service factory has to be imported here as it inits the DI.
 * We want to override DI, so first load ServiceFactory then do DI init for tests.
 */
const registerDI = () => {
	container
		.register(DIToken.EnvService, {
			useValue: {
				// will be injected from .env.jest
				getAll: () => process.env,
			},
		})
		.register(DIToken.EnvInterfaceService, {
			useValue: {
				getDebounceTime: jest.fn(),
				getMessageSuccessStatusTimeout: jest.fn(),
				getChannelHistoryIncrement: jest.fn().mockReturnValue('25'),
				getCookieDomain: jest.fn().mockReturnValue('tmp-domain'),
				i18nDebugEnabled: jest.fn().mockReturnValue(false),
				getVersion: jest.fn().mockReturnValue(false),
				isProduction: jest.fn().mockReturnValue(false),
				notProduction: jest.fn().mockReturnValue(true),
				isDev: jest.fn().mockReturnValue(false),
				getStageHostName: jest.fn(),
				getEnvName: jest.fn(),
				isCI: jest.fn(),
				getDeviceGiftIds: jest.fn(),
				isReduxSelectorStatsEnabled: jest.fn(),
				getInitialLimitOfVisibleChannels: jest.fn().mockReturnValue(10),
				maxPinnedChannelLimit: jest.fn().mockReturnValue(5),
				getNormalChannelsLimit: jest.fn().mockReturnValue('25'),
				getSearchChannelsLimit: jest.fn().mockReturnValue('25'),
				getInitialLimitOfVisibleChats: jest.fn().mockReturnValue(5),
				getInitialLimitOfVisibleMessages: jest.fn().mockReturnValue(25),
				getArchivedChannelsLimit: jest.fn(),
				getBannedChannelsLimit: jest.fn(),
				getMediaUploadUrl: jest.fn(),
				getStorePruneExitedChatsLimit: jest.fn(),
				isStoreCheckDebugEnabled: jest.fn(),
				getInitialHistoryLimit: jest.fn().mockReturnValue(50),
				getHighlightingMessageTimeout: jest.fn().mockReturnValue(500),
				isSocketProxyEnabled: jest.fn().mockReturnValue(false),
				getWsHttpsEnabled: jest.fn(),
				getWsHost: jest.fn(),
				getWsPort: jest.fn(),
				getWsPath: jest.fn(),
				getStorePruneMessagesLimit: jest.fn(),
				getRollbarAccessToken: jest.fn(),
				getSignUpLink: jest.fn(),
				getBanForeverDuration: jest.fn(),
				getLostPasswordLink: jest.fn(),
				getDeviceTestVibrateDuration: jest.fn(),
				shouldEmulateDeviceApi: jest.fn(),
				getDeviceLANUrl: jest.fn(),
				shouldLogDeviceApiErrors: jest.fn(),
				getSnackTimeout: jest.fn(),
				shouldShowInfoChannel: jest.fn().mockReturnValue(true),
				shouldShowTVChannel: jest.fn().mockReturnValue(true),
				shouldHideBlockedFilter: jest.fn().mockReturnValue(true),
				shouldHideFansFilter: jest.fn().mockReturnValue(true),
				voiceMessageEnabled: jest.fn(),
				getUserInfoMaxLines: jest.fn(),
				getLimitedFeaturesUsrId: jest.fn(),
				getAllMessagesNavigationAllowed: jest.fn().mockReturnValue(false),
				getMessageHistoryLimit: jest.fn().mockReturnValue(200),
				getMessageAdditionalLoadingAttempts: jest.fn().mockReturnValue(3),
				getMaxTicketShows: jest.fn().mockReturnValue(40),
				getDefaultCanReceiveTicket: jest.fn().mockReturnValue(false),
				getInitialWorkMode: jest.fn().mockReturnValue(EnumWorkMode.CHAT),
				getAllShowsLink: jest.fn().mockReturnValue(faker.datatype.string()),
				getModelShowsLink: jest.fn().mockReturnValue(faker.datatype.string()),
				getPhoneServiceLink: jest.fn().mockReturnValue(faker.datatype.string()),
				getMinImageDimension: jest.fn().mockReturnValueOnce(150),
				getWebNotificationTimeout: jest.fn().mockReturnValue(500),
				shouldWebNotificationAlwaysRequest: jest.fn().mockReturnValue(false),
				getAreVideoCallsActive: jest.fn().mockReturnValue(true),
				isAppMobileEnabled: jest.fn().mockReturnValue(false),
			},
		})
		.register(DIToken.I18n, {
			useValue: {
				language: SupportedLanguage.EN,
				t: (token) => token,
				changeLanguage: jest.fn(),
				exists: () => true,
				hasLoadedNamespace: () => jest.fn(),
				loadNamespaces: () => jest.fn(),
			},
		})
		.register(DIToken.reduxDispatch, {
			useValue: jest.fn(),
		})
		.register(DIToken.VControlFakerApi, {
			useValue: {
				submitFeedbackForm: jest.fn(),
				changeLanguage: jest.fn(),
				connect: jest.fn(),
				closeConnection: jest.fn(),
				logout: jest.fn(),
			},
		})
		.register(DIToken.VControlApi, {
			useValue: {
				submitFeedbackForm: jest.fn(),
				changeLanguage: jest.fn(),
				connect: jest.fn(),
				closeConnection: jest.fn(),
				logout: jest.fn(),
			},
		})
		.register(DIToken.WebRtcApi, {
			useValue: {
				requestPermissions: jest.fn(),
				isMicrophoneAvailable: jest.fn(),
				stopOutputStream: jest.fn(),
				devicesToConstraints: jest.fn(),
				mediaStream: jest.fn(),
				getStreamStats: jest.fn(),
			},
		})
		.register(DIToken.UiContainer, {
			useValue: {
				addEventListener: jest.fn(),
				removeEventListener: jest.fn(),
				setTimeout: jest.fn(),
				clearTimeout: jest.fn(),
				getSupportedConstraints: jest.fn(),
				isNotDesktop: jest.fn(),
				isMobile: jest.fn(),
				getCurrentRoute: jest.fn(),
				getVersion: jest.fn(),
				isMobileIos: jest.fn().mockReturnValue(true),
				getScreenshot: jest.fn(),
				appendFileToFeedbackForm: jest.fn(),
				getWindow: jest.fn(),
				preventZooming: jest.fn(),
				createObjectURL: jest.fn().mockImplementation(() => faker.datatype.uuid()),
				scrollToElement: jest.fn(),
			},
		})
		.register(DIToken.StoreService, {
			useValue: {
				get: jest.fn(),
				set: jest.fn(),
				remove: jest.fn(),
			},
		})
		.register(DIToken.selectChannelVMs, {
			useValue: () => {},
		})
		.register(DIToken.UINotificationService, {
			useValue: {
				enqueueType: jest.fn(),
				enqueue: jest.fn(),
				close: jest.fn(),
				dequeue: jest.fn(),
			},
		})
		.register(DIToken.VoiceMessageService, {
			useValue: {
				start: jest.fn(),
				stop: jest.fn(),
				addRecordingStatusUpdateCallback: jest.fn(),
				removeRecordingStatusUpdateCallback: jest.fn(),
				setRecordingInterrupted: jest.fn(),
				cancelRecording: jest.fn(),
			},
		})
		.register(DIToken.ToyControlApi, {
			useValue: {
				requestToysList: jest.fn(),
				sendVibrate: jest.fn(),
			},
		})
		.register(DIToken.FileProcessingService, {
			useValue: {
				isImageConversionRequired: jest.fn(),
				getMd5: jest.fn(),
				appendFileToFormData: jest.fn(),
				getImageDimension: jest.fn(),
				getFileSize: jest.fn(),
			},
		})
		.register(DIToken.globalLogger, {
			useValue: {
				error: jest.fn(),
				log: jest.fn(),
				warn: jest.fn(),
			},
		})
		.register(DIToken.AnalyticsService, {
			useValue: {
				logEvent: jest.fn(),
			},
		})
		.register(DIToken.Sip, {
			useValue: {
				init: jest.fn(),
				setEmitter: jest.fn(),
				stop: jest.fn(),
				accept: jest.fn(),
				hangUp: jest.fn(),
				callTo: jest.fn(),
				sendTone: jest.fn(),
				micAudioTrack: jest.fn(),
				soundAudioTrack: jest.fn(),
			},
		})
		.register(DIToken.LogService, {
			useValue: {
				error: jest.fn(),
				debug: jest.fn(),
				warning: jest.fn(),
				warn: jest.fn(),
				log: jest.fn(),
			},
		});
};

// DI has to be initialized before test file imports
registerDI();

jest.mock('sip.js', () => ({
	SessionState: {
		Initial: 'Initial',
		Establishing: 'Establishing',
		Established: 'Established',
		Terminating: 'Terminating',
		Terminated: 'Terminated',
	},
}));

const CONSOLE_FAIL_TYPES = ['error', 'warn', 'info', 'log', 'debug', 'assert'];

_.forEach(CONSOLE_FAIL_TYPES, (type) => {
	console[type] = (message) => {
		throw new Error(message);
	};
});
