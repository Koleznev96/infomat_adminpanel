import {LoaderFunction} from 'react-router-dom';
import {Store} from 'redux';

import {routingClientOnlyActions} from '@infomat/core/src/Redux/Routing/Actions/routingClientOnlyActions';

export const pageLoader =
	(store: Store): LoaderFunction =>
	({params: {channelId, chatId}}) => {
		store.dispatch(
			routingClientOnlyActions.updateStateAfterNavigation({
				channelId,
				chatId: channelId ? undefined : chatId ?? undefined,
			}),
		);

		return null;
	};

export const bulkPageLoader =
	(store: Store): LoaderFunction =>
	() => {
		store.dispatch(routingClientOnlyActions.updateStateAfterNavigation({}));

		return null;
	};
