import {isUndefined} from 'lodash';
import api from './moduleAxios';

import {TCategoryObjectCreate} from '../../Redux/CategoryObject/entityAdapter';

export const categoryObjectService = {
	getList,
	getItem,
	deleteItem,
	updateItem,
	createItem,
};

async function getList({page = 0, size = 10, search}: {page?: number; size?: number; search?: string}) {
	return api.get(`/categories?page=${page}&size=${size}${!isUndefined(search) ? '&search=' + search : ''}`);
}

async function getItem(id: number) {
	return api.get(`/categories/${id}`);
}

async function deleteItem(id: number) {
	return api.delete(`/categories/${id}`);
}

async function updateItem({id, title, titleEn, backgroundColor, icon}: TCategoryObjectCreate) {
	const formData = new FormData();
	formData.append(
		'placeCategory',
		new Blob([JSON.stringify({title, titleEn, backgroundColor})], {type: 'application/json'}),
	);
	if (icon?.url instanceof File) {
		formData.append('icon', icon.url);
	}

	return api.patch(`/categories/${id}`, formData);
}

async function createItem({title, titleEn, backgroundColor, icon}: TCategoryObjectCreate) {
	const formData = new FormData();
	formData.append(
		'placeCategory',
		new Blob([JSON.stringify({title, titleEn, backgroundColor})], {type: 'application/json'}),
	);
	if (icon?.url instanceof File) {
		formData.append('icon', icon.url);
	}

	return api.post(`/categories`, formData);
}
