import {isUndefined} from 'lodash';
import api, {replaceEmptyStringsWithUndefined} from './moduleAxios';

import {TCategoryObjectCreate} from '../../Redux/CategoryObject/entityAdapter';
import {TRoutesCreate} from '../../Redux/Routes/entityAdapter';

export const routesService = {
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
	status,
}: {
	page?: number;
	size?: number;
	search?: string;
	status?: string | null;
}) {
	return api.get(
		`/routes?page=${page}&size=${size}${!isUndefined(search) ? '&search=' + search : ''}${
			!isUndefined(status) && status !== null ? '&status=' + status : ''
		}`,
	);
}

async function getItem(id: number) {
	return api.get(`/routes/${id}`);
}

async function deleteItem(id: number) {
	return api.delete(`/routes/${id}`);
}

async function updateItem({id, icon, ...data}: TRoutesCreate) {
	const formData = new FormData();
	formData.append(
		'route',
		new Blob([JSON.stringify(replaceEmptyStringsWithUndefined(data))], {type: 'application/json'}),
	);
	if (icon?.url instanceof File) {
		formData.append('icon', icon.url);
	}

	return api.patch(`/routes/${id}`, formData);
}

async function createItem({id, icon, ...data}: TRoutesCreate) {
	const formData = new FormData();
	formData.append(
		'route',
		new Blob([JSON.stringify(replaceEmptyStringsWithUndefined(data))], {type: 'application/json'}),
	);
	if (icon?.url instanceof File) {
		formData.append('icon', icon.url);
	}

	return api.post(`/routes`, formData);
}
