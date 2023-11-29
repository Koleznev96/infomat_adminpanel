import {put, select} from 'typed-redux-saga';
import _ from 'lodash';

import {selectIsLoggedIn} from '@infomat/core/src/Redux/User/Selectors/selectIsLoggedIn';
import {routingClientOnlyActions} from '@infomat/core/src/Redux/Routing/Actions/routingClientOnlyActions';
import {informationClientToServerActions} from '@infomat/core/src/Redux/Information/Actions/informationClientToServerActions';
import {categoryObjectClientToServerActions} from '@infomat/core/src/Redux/CategoryObject/Actions/categoryObjectClientToServerActions';
import {subcategoryObjectClientToServerActions} from '@infomat/core/src/Redux/SubcategoryObject/Actions/subcategoryObjectClientToServerActions';
import {placesClientToServerActions} from '@infomat/core/src/Redux/Places/Actions/placesClientToServerActions';
import {eventsClientToServerActions} from '@infomat/core/src/Redux/Events/Actions/eventsClientToServerActions';
import {routesClientToServerActions} from '@infomat/core/src/Redux/Routes/Actions/routesClientToServerActions';

import {EnumRouteSlugs} from 'src/Routes/EnumRouteSlugs';

export const updateStateOnChatNavigationSaga = function* ({
	payload: {path, params},
}: ReturnType<typeof routingClientOnlyActions.updateStateAfterNavigation>) {
	try {
		const {id} = params as {id: string};
		const isLoggedIn = yield* select(selectIsLoggedIn);

		if (!isLoggedIn) {
			return;
		}

		if (path === EnumRouteSlugs.INFORMATION) {
			yield* put(informationClientToServerActions.getDeatails());
		}

		if (path === EnumRouteSlugs.CATEGORIES_OBJECTS) {
			yield* put(categoryObjectClientToServerActions.getList({}));
		}

		if (path === EnumRouteSlugs.SUBCATEGORIES_OBJECTS) {
			yield* put(subcategoryObjectClientToServerActions.getList({}));
		}

		if (path === EnumRouteSlugs.TOURIST_OBJECTS) {
			yield* put(
				placesClientToServerActions.getList({
					recommendedOnly: null,
					page: 0,
					search: '',
					status: null,
					subcategoryId: null,
				}),
			);
			yield* put(subcategoryObjectClientToServerActions.getAllList());
		}

		if (path === EnumRouteSlugs.RECOMMEND) {
			yield* put(
				placesClientToServerActions.getList({
					recommendedOnly: true,
					page: 0,
					search: '',
					status: null,
					subcategoryId: null,
				}),
			);
		}

		if (path === EnumRouteSlugs.EVENTS) {
			yield* put(eventsClientToServerActions.getList({}));
		}

		if (path === EnumRouteSlugs.TOURIST_ROUTES) {
			yield* put(routesClientToServerActions.getList({}));
		}

		if (path === EnumRouteSlugs.TOURIST_ROUT && id !== 'new') {
			yield* put(routesClientToServerActions.get(Number(id)));
		}

		if (path === EnumRouteSlugs.EVENT && id !== 'new') {
			yield* put(eventsClientToServerActions.get(Number(id)));
		}

		if (path === EnumRouteSlugs.CATEGORY_OBJECT && id !== 'new') {
			yield* put(categoryObjectClientToServerActions.get(Number(id)));
		}

		if (path === EnumRouteSlugs.SUBCATEGORY_OBJECT) {
			yield* put(categoryObjectClientToServerActions.getAllList());
			if (id !== 'new') {
				yield* put(subcategoryObjectClientToServerActions.get(Number(id)));
			}
		}

		if (path === EnumRouteSlugs.TOURIST_OBJECT) {
			yield* put(subcategoryObjectClientToServerActions.getAllList());
			if (id !== 'new') {
				yield* put(placesClientToServerActions.get(Number(id)));
			}
		}
	} catch (error) {}
};
