import {matchPath} from 'react-router';
import {createBrowserRouter} from 'react-router-dom';
import _ from 'lodash';
import {RelativeRoutingType} from '@remix-run/router';

import {EnumSagaContext, TNavigateOptions, TSagaContext} from '@infomat/core/src/Redux/sagaContext';

import {Routes} from 'src/Routes/Routes';
import {getCloseModalRoute} from 'src/Utils/Navigation/getCloseModalRoute';

export const createSagaContext = (router: ReturnType<typeof createBrowserRouter>): TSagaContext => {
	const navigate = (path: string, options?: TNavigateOptions & {relative?: RelativeRoutingType}) => {
		router.navigate(path, _.assign({state: {bypassNavigationPrompt: true}}, options));
	};

	return {
		[EnumSagaContext.ROUTER]: {
			// goToChannelMessages(channelId, options) {
			// 	navigate(Routes.channel(channelId), options);
			// },

			// goToIntro(isChannel?: boolean) {
			// 	isChannel ? navigate(Routes.modal.introChannel, {replace: true}) : navigate(Routes.modal.intro);
			// },

			// goToChatMessages(chatId, options) {
			// 	navigate(Routes.chat(chatId), options);
			// },

			goHome(options) {
				navigate(Routes.home, options);
			},

			goUp() {
				navigate(getCloseModalRoute(router.state.location.pathname), {relative: 'path'});
			},

			// isChannelPage(channelId: string) {
			// 	return !_.isEmpty(
			// 		matchPath(
			// 			{
			// 				path: Routes.channel(channelId),
			// 			},
			// 			router.state.location.pathname,
			// 		),
			// 	);
			// },
			// isChatPage(chatId: string) {
			// 	return !_.isEmpty(
			// 		matchPath(
			// 			{
			// 				path: Routes.chat(chatId),
			// 			},
			// 			router.state.location.pathname,
			// 		),
			// 	);
			// },
		},
	};
};
