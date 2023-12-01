import {isUndefined} from 'lodash';
import api, {replaceEmptyStringsWithUndefined} from './moduleAxios';

import {TCategoryObjectCreate} from '../../Redux/CategoryObject/entityAdapter';

export const specialPlacesService = {
	getList,
	getItem,
	deleteItem,
	updateItem,
	createItem,
};

async function getList({
	page = 0,
	size = 10,
	search,
	type,
}: {
	page?: number;
	size?: number;
	search?: string;
	type?: string | null;
}) {
	return api.get(
		`/specialPlaces?page=${page}&size=${size}${!isUndefined(search) && search !== '' ? '&search=' + search : ''}${
			!isUndefined(type) && type !== null ? '&type=' + type : ''
		}`,
	);
}

async function getItem(id: number) {
	return api.get(`/specialPlaces/${id}`);
}

async function deleteItem(id: number) {
	return api.delete(`/specialPlaces/${id}`);
}

async function updateItem({id, icon, ...data}: TCategoryObjectCreate) {
	const formData = new FormData();
	formData.append(
		'specialPlace',
		new Blob([JSON.stringify(replaceEmptyStringsWithUndefined(data))], {
			type: 'application/json',
		}),
	);
	if (icon?.url instanceof File) {
		formData.append('icon', icon.url);
	}

	return api.patch(`/specialPlaces/${id}`, formData);
}

async function createItem({id, icon, ...data}: TCategoryObjectCreate) {
	const formData = new FormData();
	formData.append(
		'specialPlace',
		new Blob([JSON.stringify(replaceEmptyStringsWithUndefined(data))], {
			type: 'application/json',
		}),
	);
	if (icon?.url instanceof File) {
		formData.append('icon', icon.url);
	}

	return api.post(`/specialPlaces`, formData);
}
