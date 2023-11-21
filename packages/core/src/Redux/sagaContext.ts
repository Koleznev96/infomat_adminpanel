import {getContext} from 'typed-redux-saga';

export enum EnumSagaContext {
	ROUTER = 'router',
}

export type TNavigateOptions = {replace?: boolean};

export type TSagaContext = {
	[EnumSagaContext.ROUTER]: {
		// goToChannelMessages: (channelId: string, options?: TNavigateOptions) => void;
		// goToIntro: (isChannel?: boolean) => void;
		// goToChatMessages: (chatId: string, options?: TNavigateOptions) => void;
		goHome: (options?: TNavigateOptions) => void;
		goUp: () => void;
		// isChannelPage: (channelId: string) => boolean;
		// isChatPage: (chatId: string) => boolean;
	};
};

export const getNavigationContext = function* () {
	return yield* getContext<TSagaContext[EnumSagaContext.ROUTER]>(EnumSagaContext.ROUTER);
};
