import api from './moduleAxios';

export const geocodingService = {
	getForKeyword,
	getForGeocoding,
};

async function getForKeyword(keyword: string) {
	return api.get(`/geocoding?keyword=${keyword}&maxResults=${10}`);
}

async function getForGeocoding({latitude, longitude}: {latitude?: number; longitude?: number}) {
	return api.get(`/geocoding/reverse?latitude=${latitude}&longitude=${longitude}`);
}
