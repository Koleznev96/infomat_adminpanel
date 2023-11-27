import {isUndefined} from 'lodash';
import api, {replaceEmptyStringsWithUndefined} from './moduleAxios';

import {TInformationVM} from '../../Redux/Information/type';

export const informationService = {
	getData,
	updateData,
};

async function getData() {
	return api.get(`/general`);
}

async function updateData({videos, ...data}: TInformationVM & {videoIdsForRemoving?: number[]}) {
	const formData = new FormData();
	formData.append(
		'general',
		new Blob([JSON.stringify(replaceEmptyStringsWithUndefined(data))], {type: 'application/json'}),
	);
	for (const video of videos) {
		if (video?.url instanceof File) {
			formData.append('video', video?.url);
		}
	}

	return api.patch(`/general`, formData);
}
