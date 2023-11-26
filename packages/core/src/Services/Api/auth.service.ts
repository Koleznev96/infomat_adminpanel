import api from './moduleAxios';

export const authService = {
	login,
};

async function login(login: string, password: string) {
	const formData = new FormData();
	formData.append('login', login);
	formData.append('password', password);
	return api.post(`/login`, formData);
}
