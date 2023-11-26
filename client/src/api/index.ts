import axios, { InternalAxiosRequestConfig } from 'axios';
import { ShortlinkFormData } from '../types';

// const api = axios.create({ baseURL: 'http://localhost:5000/api/v1' });
// proxy used
const api = axios.create({ baseURL: '/api/v1' });

// =============================================================================================================
// Interceptors
// =============================================================================================================
api.interceptors.request.use(
	(req: InternalAxiosRequestConfig<any>): InternalAxiosRequestConfig<any> => {
		if (
			localStorage.getItem('profile') &&
			localStorage.getItem('profile') !== undefined
		) {
			req.headers.Authorization = `Bearer ${
				JSON.parse(localStorage.getItem('profile') || '')?.token
			}`;
		}
		return req;
	},
	(error) => {
		console.log(error);
	}
);
// =============================================================================================================
// User
// =============================================================================================================

export const createUser = (formData: any) => {
	return api.post('/users', { formData });
};

export const login = (formData: any) => {
	return api.post(`/users/login`, { formData });
};

export const getUser = () => {
	// gets the userId from authMiddlware in server
	return api.get(`/users/userId`);
};

export const patchUser = (formData: any) => {
	// gets the userId from authMiddlware in server
	return api.patch(`/users/userId`, { formData });
};

export const deleteUser = () => {
	// gets the userId from authMiddlware in server
	return api.delete(`/users/userId`);
};

export const loginDemo = () => {
	return api.post('/users/loginDemo');
};

// =============================================================================================================
// Shortlink
// =============================================================================================================

export const createShortlink = (formData: ShortlinkFormData) => {
	return api.post('/shortlinks', { formData });
};

export const getShortlink = (shortlinkId: any) => {
	return api.get(`/shortlinks/${shortlinkId}`);
};

export const patchShortlink = (formData: any, shortlinkId: any) => {
	return api.patch(`/shortlinks/${shortlinkId}`, { formData });
};

export const deleteShortlink = (shortlinkId: any) => {
	return api.delete(`/shortlinks/${shortlinkId}`);
};

export const getAllShortlinks = () => {
	return api.get('/shortlinks');
};

export const getAllShortlinksWithFilters = (
	page: any,
	search: any,
	sort = 'az'
) => {
	if (search === '') {
		search = '~';
	}
	if (page === '') {
		page = '1';
	}
	return api.get(`/shortlinks/f?page=${page}&search=${search}&sort=${sort}`);
};
