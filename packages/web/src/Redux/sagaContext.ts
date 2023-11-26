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
			goHome(options) {
				navigate(Routes.home, options);
			},

			goInformation(options) {
				navigate(Routes.information, options);
			},

			goEvents(options) {
				navigate(Routes.events, options);
			},

			goEvent(id, options) {
				navigate(Routes.event(id), options);
			},

			goRecommend(options) {
				navigate(Routes.recommend, options);
			},

			goTouristRoutes(options) {
				navigate(Routes.touristRoutes, options);
			},

			goTouristRout(id, options) {
				navigate(Routes.touristRout(id), options);
			},

			goSubcategoriesObjects(options) {
				navigate(Routes.subcategoriesObjects, options);
			},

			goSubcategoryObject(id, options) {
				navigate(Routes.subcategoryObject(id), options);
			},

			goCategoriesObjects(options) {
				navigate(Routes.categoriesObjects, options);
			},

			goCategoryObject(id, options) {
				navigate(Routes.categoryObject(id), options);
			},

			goTouristObjects(options) {
				navigate(Routes.touristObjects, options);
			},

			goTouristObject(id, options) {
				navigate(Routes.touristObject(id), options);
			},
		},
	};
};
