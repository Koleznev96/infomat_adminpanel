import {ClientOnlyActions} from '@infomat/core/src/Actions/ActionCreator';

enum RoutingActions {
	CHAT_NAVIGATION = 'CHAT_NAVIGATION',
	NAVIGATE_CHANNEL_OR_CHAT = 'NAVIGATE_CHANNEL_OR_CHAT',
}

const scope = 'ROUTING';

export class RoutingClientOnlyActions extends ClientOnlyActions<typeof scope> {
	readonly scope = scope;

	updateStateAfterNavigation = this.createAction(
		RoutingActions.CHAT_NAVIGATION,
		this.getPrepareAction<{channelId?: string; chatId?: string}>(),
	);

	navigateChatOrChannel = this.createAction(
		RoutingActions.NAVIGATE_CHANNEL_OR_CHAT,
		this.getPrepareAction<{chatOrChannelId: string}>(),
	);
}

export const routingClientOnlyActions = new RoutingClientOnlyActions();
