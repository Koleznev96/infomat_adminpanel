import {generatePath} from 'react-router';
import {isUndefined} from 'lodash';

import {EnumRouteSlugs} from 'src/Routes/EnumRouteSlugs';

export const Routes = {
	home: '/',
	information: `/${EnumRouteSlugs.INFORMATION}`,

	events: `/${EnumRouteSlugs.EVENTS}`,
	event: (id?: number) => generatePath(`/${EnumRouteSlugs.EVENT}`, {id: isUndefined(id) ? 'new' : String(id)}),

	recommend: `/${EnumRouteSlugs.RECOMMEND}`,

	touristRoutes: `/${EnumRouteSlugs.TOURIST_ROUTES}`,
	touristRout: (id?: number) =>
		generatePath(`/${EnumRouteSlugs.TOURIST_ROUT}`, {id: isUndefined(id) ? 'new' : String(id)}),

	subcategoriesObjects: `/${EnumRouteSlugs.SUBCATEGORIES_OBJECTS}`,
	subcategoryObject: (id?: number) =>
		generatePath(`/${EnumRouteSlugs.SUBCATEGORY_OBJECT}`, {id: isUndefined(id) ? 'new' : String(id)}),

	categoriesObjects: `/${EnumRouteSlugs.CATEGORIES_OBJECTS}`,
	categoryObject: (id?: number) =>
		generatePath(`/${EnumRouteSlugs.CATEGORY_OBJECT}`, {id: isUndefined(id) ? 'new' : String(id)}),

	touristObjects: `/${EnumRouteSlugs.TOURIST_OBJECTS}`,
	touristObject: (id?: number) =>
		generatePath(`/${EnumRouteSlugs.TOURIST_OBJECT}`, {id: isUndefined(id) ? 'new' : String(id)}),
};
