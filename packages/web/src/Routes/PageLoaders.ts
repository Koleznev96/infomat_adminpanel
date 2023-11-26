import {LoaderFunction, LoaderFunctionArgs} from 'react-router-dom';
import {Store} from 'redux';

import {routingClientOnlyActions} from '@infomat/core/src/Redux/Routing/Actions/routingClientOnlyActions';

import {EnumRouteSlugs} from './EnumRouteSlugs';

export const pageLoader =
	(store: Store, path: EnumRouteSlugs, args: LoaderFunctionArgs): LoaderFunction =>
	() => {
		store.dispatch(routingClientOnlyActions.updateStateAfterNavigation({path, params: args.params}));

		return null;
	};
