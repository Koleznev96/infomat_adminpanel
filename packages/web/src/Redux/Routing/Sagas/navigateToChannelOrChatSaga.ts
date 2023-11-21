import {select, call} from 'typed-redux-saga';

import ServiceFactory from '@infomat/core/src/Services/ServiceFactory';
import {selectChannelIds} from '@infomat/core/src/Redux/Channels/Selectors/defaultSelectors';
import selectActiveChatIds from '@infomat/core/src/Redux/Chats/Selectors/selectActiveChatIds';
import {getNavigationContext} from '@infomat/core/src/Redux/sagaContext';
import {routingClientOnlyActions} from '@infomat/core/src/Redux/Routing/Actions/routingClientOnlyActions';

const navigateToChannelOrChatSaga = function* ({
	payload: {chatOrChannelId},
}: ReturnType<typeof routingClientOnlyActions.navigateChatOrChannel>) {
	try {
		const activeChats = yield* select(selectActiveChatIds);
		const {goToChatMessages, goToChannelMessages} = yield* getNavigationContext();

		if (activeChats.includes(chatOrChannelId)) {
			yield* call(goToChatMessages, chatOrChannelId);

			return;
		}

		const channelIds = yield* select(selectChannelIds);

		if (channelIds.includes(chatOrChannelId)) {
			yield* call(goToChannelMessages, chatOrChannelId);
		}
	} catch (error) {
		ServiceFactory.logService.error(error, {saga: 'navigateToChannelOrChatSaga'});
	}
};

export default navigateToChannelOrChatSaga;
