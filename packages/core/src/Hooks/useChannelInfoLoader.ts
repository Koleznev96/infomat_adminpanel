import {useDispatch} from 'react-redux';
import {useEffect} from 'react';

import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';
import {
	getChannelIdForSelector,
	selectChannelVMById,
} from '@infomat/core/src/Redux/Channels/Selectors/defaultSelectors';
import {channelsClientOnlyActions} from '@infomat/core/src/Redux/Channels/Actions';

export const useChannelInfoLoader = (channelId: string) => {
	const channelVM = useStoreSelector(selectChannelVMById, getChannelIdForSelector(channelId));
	const dispatch = useDispatch();

	useEffect(() => {
		if (!channelVM) {
			dispatch(channelsClientOnlyActions.requestChannels({channelIds: [channelId], requestInfo: true}));
		}
	}, [dispatch, channelId, channelVM]);
};
