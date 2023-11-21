export enum EnumRouteSlugs {
	NEW = 'new',
	PARAM_ID = ':id',
	PARAM_TAB = ':tab',
	PARAM_CHAT_ID = ':chatId',
	PARAM_CHANNEL_ID = ':channelId',
	PARAM_LIVE_SESSION_ID = ':liveSessionId',

	INFORMATION = 'information',

	EVENTS = 'events',
	EVENT = 'events/:id',

	RECOMMEND = 'recommend',

	TOURIST_ROUTES = 'tourist-routes',
	TOURIST_ROUT = 'tourist-routes/:id',

	SUBCATEGORIES_OBJECTS = 'subcategories-objects',
	SUBCATEGORY_OBJECT = 'subcategories-objects/:id',

	CATEGORIES_OBJECTS = 'categories-objects',
	CATEGORY_OBJECT = 'categories-objects/:id',

	TOURIST_OBJECTS = 'tourist-objects',
	TOURIST_OBJECT = 'tourist-objects/:id',

	CHATS_ALL = 'chats/all',
	CHAT = 'chats/:chatId',

	CHANNELS = 'channels',
	CHANNEL = 'channels/:channelId',
	CHANNEL_MESSAGE = 'channels/:channelId/message',
	CHANNEL_INFO = 'channels/:channelId/info',

	BULK_MESSAGE = 'bulk-message',
	BULK_SELECT = 'bulk-select',
	LIVECHAT = 'livechat',

	LIVE_SESSIONS = 'live-sessions',
	LIVE_SESSION = 'live-sessions/:liveSessionId',

	MESSAGE = 'message',
	INFO = 'info',

	MODAL = '--modal',
	ALL = 'all',

	SETTINGS = 'settings',
	SIP_CALL = 'call',
	INTRO = 'introduction',

	//settings
	CHAT_PRICES = 'video-chat',
	TICKET_LIVE_SHOW = 'ticket-live-show',
	GROUPS = 'groups',
	SHORTCUTS = 'shortcuts',
	FEEDBACK = 'feedback',
	SPEED_TEST = 'speed-test',
	TOYS = 'device',
	FONT_SIZE = 'font-size',
	HEATMAP = 'heatmap',
	EXTERNAL_DEVICE = 'external-device',
	LANGUAGE = 'language',
	GENERAL = 'general',

	//action modals
	OFFER_DISCOUNT = 'offer-discount/:chatId',
	KICK = 'kick/:chatId',
	MOVE_TO_SPAM = 'move-to-spam/:channelId',
	BAN = 'ban/:channelId',
	REPORT = 'report/:channelId',
	VOICE_RECORDER = 'voice-recorder',
}
