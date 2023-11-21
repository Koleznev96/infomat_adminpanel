import {call, put, select} from 'typed-redux-saga';
import _ from 'lodash';
import {AnyAction} from 'redux';
import {batchActions} from 'redux-batched-actions';

import {channelsClientOnlyActions} from '@infomat/core/src/Redux/Channels/Actions';
import {ALL_CHATS, BULK} from '@infomat/core/src/BusinessLogic/Constants';
import ClientActionCreator from '@infomat/core/src/Actions/Client/ActionCreator';
import ServiceFactory from '@infomat/core/src/Services/ServiceFactory';
import {chatsClientOnlyActions} from '@infomat/core/src/Redux/Chats/Actions';
import {selectCam2CamPreviewIds} from '@infomat/core/src/Redux/Cam2CamPreview/Selectors/defaultSelectors';
import selectSelectedChatId from '@infomat/core/src/Redux/Chats/Selectors/selectSelectedChatId';
import getSelectedChannelId from '@infomat/core/src/Redux/Channels/Selectors/getSelectedChannelId';
import {getNavigationContext} from '@infomat/core/src/Redux/sagaContext';
import {selectTeamChannelId} from '@infomat/core/src/Redux/Channels/Selectors/selectTeamChannelId';
import {selectIsCam2CamAreaOpen} from '@infomat/core/src/Redux/Client/Selectors/selectIsCam2CamAreaOpen';
import {selectChatVmById} from '@infomat/core/src/Redux/Chats/Selectors/selectChatVmById';
import {selectIsLoggedIn} from '@infomat/core/src/Redux/Session/Selectors/selectIsLoggedIn';
import {routingClientOnlyActions} from '@infomat/core/src/Redux/Routing/Actions/routingClientOnlyActions';
import {channelInputTextClientOnlyActions} from '@infomat/core/src/Redux/ChannelInputText/Actions/channelInputTextClientOnlyActions';
import {getAttachmentId} from '@infomat/core/src/Redux/Attachment/AttachmentVM';
import {attachmentClientOnlyActions} from '@infomat/core/src/Redux/Attachment/Actions';
import {channelsMapClientOnlyActions} from '@infomat/core/src/Redux/ChannelsMap/Actions/channelsMapClientOnlyActions';
import {selectSessionUsrKey} from '@infomat/core/src/Redux/Session/Selectors/selectSessionUsrKey';
import {selectSessionUsrId} from '@infomat/core/src/Redux/Session/Selectors/selectSessionUsrId';
import {EnumReservedChannelIds} from '@infomat/core/src/BusinessLogic/EnumReservedChannelIds';

export const updateStateOnChatNavigationSaga = function* ({
	payload: {channelId, chatId},
}: ReturnType<typeof routingClientOnlyActions.updateStateAfterNavigation>) {
	try {
		const isLoggedIn = yield* select(selectIsLoggedIn);

		if (!isLoggedIn) {
			return;
		}

		const {goToChatMessages} = yield* getNavigationContext();
		const isBulk = !channelId && !chatId;
		const selectedChannelId = yield* select(getSelectedChannelId);
		const selectedChatId = yield* select(selectSelectedChatId);
		let batchedActions: AnyAction[] = [];
		let actions: AnyAction[] = [];

		if (channelId) {
			const userKey = yield* select(selectSessionUsrKey);
			const userId = yield* select(selectSessionUsrId);

			if (
				channelId !== EnumReservedChannelIds.CHANNEL_ID_JOHN_DOE &&
				userId &&
				userKey &&
				channelId.indexOf(`${userId}.${userKey}`) !== 0
			) {
				yield* call(goToChatMessages, ALL_CHATS, {replace: true});

				return;
			}

			if (channelId !== selectedChannelId) {
				batchedActions = [
					chatsClientOnlyActions.resetSelected(),
					channelsClientOnlyActions.setSelected(channelId),
					channelsClientOnlyActions.setTargets({channelIds: [channelId]}),
					ClientActionCreator.forceDrawer(false),
				];

				actions = [
					channelsClientOnlyActions.requestExtraHistory({channelId}),
					channelsMapClientOnlyActions.processChannelSelection({channelId}),
				];

				if (channelId === (yield* select(selectTeamChannelId))) {
					batchedActions.push(ClientActionCreator.closeUserArea());
				} else {
					batchedActions.push(ClientActionCreator.setUserAreaChannelId(channelId));
				}

				if (yield* select(selectIsCam2CamAreaOpen)) {
					batchedActions.push(ClientActionCreator.closeCam2CamArea());
				}
			}
		} else if (chatId) {
			if (chatId !== selectedChatId) {
				batchedActions = [
					channelsClientOnlyActions.resetSelected(),
					channelsClientOnlyActions.resetTargetsSelection(),
					ClientActionCreator.forceDrawer(false),
				];

				const cam2CamPreviewChatIds = yield* select(selectCam2CamPreviewIds);

				if (chatId === ALL_CHATS) {
					if (!_.isEmpty(cam2CamPreviewChatIds)) {
						batchedActions.push(ClientActionCreator.openCam2CamArea(selectedChatId));
					}

					batchedActions.push(chatsClientOnlyActions.selectChat(ALL_CHATS));
				} else {
					const chatVM = yield* select(selectChatVmById, {chatId});

					if (chatVM) {
						if (
							chatVM.channelId &&
							_.includes(cam2CamPreviewChatIds, chatId) &&
							!ServiceFactory.uiContainer.isMobile(false)
						) {
							batchedActions.push(ClientActionCreator.openUserArea(chatVM.channelId));
						}

						batchedActions.push(chatsClientOnlyActions.selectChat(chatId));

						if (chatVM.channelId) {
							batchedActions.push(ClientActionCreator.setUserAreaChannelId(chatVM.channelId));
							actions.push(channelsClientOnlyActions.requestExtraHistory({channelId: chatVM.channelId}));
						}

						const teamChannelId: string | undefined = yield* select(selectTeamChannelId);

						if (chatVM.isVoyeur || chatVM.isAdmin || chatVM.channelId === teamChannelId) {
							batchedActions.push(ClientActionCreator.closeUserArea());
						}

						if (chatVM.isGroupChat) {
							actions.push(chatsClientOnlyActions.setIsGroupChatExpanded(true));
						}

						actions.push(channelsMapClientOnlyActions.processChatSelection({chatId}));
					} else {
						yield* call(goToChatMessages, ALL_CHATS, {replace: true});

						return;
					}
				}
			}
		} else if (isBulk && (selectedChannelId || selectedChatId)) {
			batchedActions = [
				channelsClientOnlyActions.resetSelected(),
				chatsClientOnlyActions.resetSelected(),
				channelsClientOnlyActions.resetTargetsSelection(),
				ClientActionCreator.forceDrawer(false),
			];
		}

		if (!isBulk && !selectedChannelId && !selectedChatId) {
			batchedActions.push(channelInputTextClientOnlyActions.resetEditorState(BULK));
			actions.push(
				attachmentClientOnlyActions.detach({
					attachmentId: getAttachmentId(),
				}),
			);
		}

		if (!_.isEmpty(batchedActions)) {
			yield* put(batchActions(batchedActions));
		}

		for (const i in actions) {
			yield* put(actions[i]);
		}
	} catch (error) {
		ServiceFactory.logService.error(error, {saga: 'updateStateOnChatNavigationSaga', payload: {channelId, chatId}});
	}
};
