import {isUndefined} from 'lodash';
import api, {replaceEmptyStringsWithUndefined} from './moduleAxios';
import _ from 'lodash';

import {TPlacesVM, TPlacesCreate} from '../../Redux/Places/entityAdapter';

export const placesService = {
	getList,
	getItem,
	deleteItem,
	updateItem,
	createItem,
};

const URL = '/places';

async function getList({
	page = 0,
	size = 10,
	search,
	status,
	recommendedOnly,
	subcategoryId,
}: {
	page?: number;
	size?: number;
	search?: string;
	status?: string | null;
	recommendedOnly?: boolean | null;
	subcategoryId?: number | null;
}) {
	return api.get(
		`${URL}?page=${page}&size=${size}${!isUndefined(search) ? '&search=' + search : ''}${
			!isUndefined(status) && status !== null ? '&status=' + status : ''
		}${!isUndefined(recommendedOnly) && recommendedOnly !== null ? '&recommendedOnly=' + recommendedOnly : ''}${
			!isUndefined(subcategoryId) && subcategoryId !== null ? '&subcategoryId=' + subcategoryId : ''
		}`,
	);
}

async function getItem(id: number) {
	return api.get(`${URL}/${id}`);
}

async function deleteItem(id: number) {
	return api.delete(`${URL}/${id}`);
}

async function updateItem({id, cover, photos, frames, ...data}: TPlacesCreate) {
	const formData = new FormData();
	const dataValid = {...data, frames: _.filter(frames, (item) => !_.isUndefined(item) && item.partName !== null)};
	formData.append(
		'place',
		new Blob([JSON.stringify(replaceEmptyStringsWithUndefined(dataValid))], {
			type: 'application/json',
		}),
	);
	if (cover?.url3x2 instanceof File) {
		formData.append('cover', cover.url3x2);
	}
	if (photos) {
		for (const photo of photos) {
			if (photo?.url3x2 instanceof File) {
				formData.append(photo.partName || 'photo', photo?.url3x2);
			}
		}
	}

	return api.patch(`${URL}/${id}`, formData);
}

async function createItem({cover, photos, frames, ...data}: TPlacesCreate) {
	const formData = new FormData();
	const dataValid = {...data, frames: _.filter(frames, (item) => !_.isUndefined(item) && item.partName !== null)};
	formData.append(
		'place',
		new Blob([JSON.stringify(replaceEmptyStringsWithUndefined(dataValid))], {type: 'application/json'}),
	);
	if (cover?.url3x2 instanceof File) {
		formData.append('cover', cover.url3x2);
	}
	if (photos) {
		for (const photo of photos) {
			if (photo?.url3x2 instanceof File) {
				formData.append(photo.partName || 'photo', photo?.url3x2);
			}
		}
	}

	return api.post(`${URL}`, formData);
}
