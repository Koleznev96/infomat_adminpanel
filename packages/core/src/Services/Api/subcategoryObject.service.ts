import {isUndefined} from 'lodash';
import api, {replaceEmptyStringsWithUndefined} from './moduleAxios';

import {TCategoryObjectCreate} from '../../Redux/CategoryObject/entityAdapter';
import {TSubcategoryObjectCreate} from '../../Redux/SubcategoryObject/entityAdapter';

export const subcategoryObject = {
	getList,
	getItem,
	deleteItem,
	updateItem,
	createItem,
};

async function getList({page = 0, size = 10, search}: {page?: number; size?: number; search?: string}) {
	return api.get(`/subcategories?page=${page}&size=${size}${!isUndefined(search) ? '&search=' + search : ''}`);
}

async function getItem(id: number) {
	return api.get(`/subcategories/${id}`);
}

async function deleteItem(id: number) {
	return api.delete(`/subcategories/${id}`);
}

async function updateItem({id, icon, ...data}: TSubcategoryObjectCreate & {categoryId?: number}) {
	const formData = new FormData();
	formData.append(
		'placeSubcategory',
		new Blob([JSON.stringify(replaceEmptyStringsWithUndefined(data))], {type: 'application/json'}),
	);
	if (icon?.url instanceof File) {
		formData.append('icon', icon.url);
	}

	return api.patch(`/subcategories/${id}`, formData);
}

async function createItem({id, icon, ...data}: TCategoryObjectCreate & {categoryId?: number}) {
	const formData = new FormData();
	formData.append(
		'placeSubcategory',
		new Blob([JSON.stringify(replaceEmptyStringsWithUndefined(data))], {type: 'application/json'}),
	);
	if (icon?.url instanceof File) {
		formData.append('icon', icon.url);
	}

	return api.post(`/subcategories`, formData);
}
