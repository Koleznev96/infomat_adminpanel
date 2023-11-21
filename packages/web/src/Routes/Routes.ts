import {generatePath} from 'react-router';
import {isUndefined} from 'lodash';

import {EnumRouteSlugs} from 'src/Routes/EnumRouteSlugs';

export const Routes = {
	home: '/',
	information: `/${EnumRouteSlugs.INFORMATION}`,

	events: `/${EnumRouteSlugs.EVENTS}`,
	event: (id?: string) => generatePath(`/${EnumRouteSlugs.EVENT}`, {id: isUndefined(id) ? 'new' : id}),

	recommend: `/${EnumRouteSlugs.RECOMMEND}`,

	touristRoutes: `/${EnumRouteSlugs.TOURIST_ROUTES}`,
	touristRout: (id?: string) => generatePath(`/${EnumRouteSlugs.TOURIST_ROUT}`, {id: isUndefined(id) ? 'new' : id}),

	subcategoriesObjects: `/${EnumRouteSlugs.SUBCATEGORIES_OBJECTS}`,
	subcategoryObject: (id?: string) =>
		generatePath(`/${EnumRouteSlugs.SUBCATEGORY_OBJECT}`, {id: isUndefined(id) ? 'new' : id}),

	categoriesObjects: `/${EnumRouteSlugs.CATEGORIES_OBJECTS}`,
	categoryObject: (id?: string) =>
		generatePath(`/${EnumRouteSlugs.CATEGORY_OBJECT}`, {id: isUndefined(id) ? 'new' : id}),

	touristObjects: `/${EnumRouteSlugs.TOURIST_OBJECTS}`,
	touristObject: (id?: string) => generatePath(`/${EnumRouteSlugs.TOURIST_OBJECT}`, {id: isUndefined(id) ? 'new' : id}),
};
