import {isUndefined} from 'lodash';
import api, {replaceEmptyStringsWithUndefined} from './moduleAxios';
import _ from 'lodash';

import {TEventsCreate} from '@infomat/core/src/Redux/Events/entityAdapter';

export const eventsService = {
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
	startDate,
}: {
	page?: number;
	size?: number;
	search?: string;
	status?: string | null;
	startDate?: boolean | null;
}) {
	const orederBy = '&orderBy=' + (startDate ? 'ASC' : 'DESC');
	return api.get(
		`/events?page=${page}&size=${size}${!isUndefined(search) ? '&search=' + search : ''}${
			!isUndefined(status) && status !== null ? '&status=' + status : ''
		}${!isUndefined(startDate) && startDate !== null ? orederBy : ''}`,
	);
}

async function getItem(id: number) {
	return api.get(`/events/${id}`);
}

async function deleteItem(id: number) {
	return api.delete(`/events/${id}`);
}

async function updateItem({id, cover, photos, frames, ...data}: TEventsCreate) {
	const formData = new FormData();
	const dataValid = {...data, frames: _.filter(frames, (item) => !_.isUndefined(item))};
	formData.append(
		'event',
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

	return api.patch(`/events/${id}`, formData);
}

async function createItem({id, cover, photos, frames, ...data}: TEventsCreate) {
	const formData = new FormData();
	const dataValid = {...data, frames: _.filter(frames, (item) => !_.isUndefined(item))};
	formData.append(
		'event',
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

	return api.post(`/events`, formData);
}
