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
import {selectCategoryObjectData} from '@infomat/core/src/Redux/CategoryObject/Selectors/selectCategoryObjectData';
import {selectSubcategoryObjectData} from '@infomat/core/src/Redux/SubcategoryObject/Selectors/selectSubcategoryObjectData';
import {selectPlacesData} from '@infomat/core/src/Redux/Places/Selectors/selectPlacesData';
import {selectEventsData} from '@infomat/core/src/Redux/Events/Selectors/selectEventsData';
import {selectRoutesData} from '@infomat/core/src/Redux/Routes/Selectors/selectRoutesData';

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
			yield* put(placesClientToServerActions.getList({recommendedOnly: null, page: 0, search: '', status: null}));
		}

		if (path === EnumRouteSlugs.RECOMMEND) {
			yield* put(placesClientToServerActions.getList({recommendedOnly: true, page: 0, search: '', status: null}));
		}

		if (path === EnumRouteSlugs.EVENTS) {
			yield* put(eventsClientToServerActions.getList({}));
		}

		if (path === EnumRouteSlugs.TOURIST_ROUTES) {
			yield* put(routesClientToServerActions.getList({}));
		}

		if (path === EnumRouteSlugs.TOURIST_ROUT && id !== 'new') {
			const touristRoutVM = yield* select(selectRoutesData);

			if (_.isUndefined(touristRoutVM) || touristRoutVM?.id !== Number(id)) {
				yield* put(routesClientToServerActions.get(Number(id)));
			}
		}

		if (path === EnumRouteSlugs.EVENT && id !== 'new') {
			const eventObjectVM = yield* select(selectEventsData);

			if (_.isUndefined(eventObjectVM) || eventObjectVM?.id !== Number(id)) {
				yield* put(eventsClientToServerActions.get(Number(id)));
			}
		}

		if (path === EnumRouteSlugs.CATEGORY_OBJECT && id !== 'new') {
			const categoryObjectVM = yield* select(selectCategoryObjectData);

			if (_.isUndefined(categoryObjectVM) || categoryObjectVM?.id !== Number(id)) {
				yield* put(categoryObjectClientToServerActions.get(Number(id)));
			}
		}

		if (path === EnumRouteSlugs.SUBCATEGORY_OBJECT) {
			const subcategoryObjectVM = yield* select(selectSubcategoryObjectData);

			if (id !== 'new' && (_.isUndefined(subcategoryObjectVM) || subcategoryObjectVM?.id !== Number(id))) {
				yield* put(subcategoryObjectClientToServerActions.get(Number(id)));
			}

			yield* put(categoryObjectClientToServerActions.getAllList());
		}

		if (path === EnumRouteSlugs.TOURIST_OBJECT) {
			const touristObjectVM = yield* select(selectPlacesData);

			if (id !== 'new' && (_.isUndefined(touristObjectVM) || touristObjectVM?.id !== Number(id))) {
				yield* put(placesClientToServerActions.get(Number(id)));
			}

			yield* put(subcategoryObjectClientToServerActions.getAllList());
		}
	} catch (error) {}
};
