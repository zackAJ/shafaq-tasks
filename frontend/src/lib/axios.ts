import Axios from 'axios'
import { csrf } from '../api/csrf';
import type { ApiCallOptions, ApiError, ApiResponse } from "@/types/api";
import { useAuthStore } from '../store/auth';
import { useUserStore } from '../store/user';

const axios = Axios.create({
	baseURL: import.meta.env.VITE_BACKEND_URL,
	headers: {
		'X-Requested-With': 'XMLHttpRequest',
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	},
	withCredentials: true,
	withXSRFToken: true,
})

const userStore = useUserStore.getState()
const authStore = useAuthStore.getState()

/*
 * before request interceptor 
 */
axios.interceptors.request.use(function(config) {
	config.headers.Authorization = 'Bearer ' + authStore.token;
	return config;
}, function(error) {
	return Promise.reject(error);
});

/* 
 * after response interceptor 
 */
axios.interceptors.response.use(
	response => response,
	async error => {

		//unauthenticated
		if (error.status === 401) {
			userStore.clear()
			authStore.clear()
			// await uiStore().notify({ message: "You've been logged out", duration: 2000, type: 'error' })
			window.location.replace('/login')
		}
		//not found
		else if (error.status === 404) {
			window.location.replace('/404')
		}

		//forbidden
		else if (error.status === 403) {
			// uiStore().notify({ message: "Action not allowed", duration: 2000, type: 'error' })
		}

		// get csrf cookie if expired and then retry
		else if (error.status === 419) {
			await csrf()
			return axios(error.config);
		}

		//fallback error
		else {
			// uiStore().notify({ message: "Something went wrong", duration: 2000, type: 'error' })
		}

		return Promise.reject(error)
	}
);


/**
 * Axios wrapper
 */
export const apiCall = async <T>(
	options: ApiCallOptions<T>
): Promise<ApiResponse<T> | ApiError> => {
	const { method, url, params, data, withLoading = false, onFailure: onCatch, onSuccess, onFinally } = options;
	//TODO: start loading
	try {
		const response = await axios({ method, url, params, data });
		if (onSuccess) onSuccess(response.data, response.status)
		return { data: response.data, status: response.status, error: undefined };

	} catch (e: any) {
		console.error(e)
		if (onCatch) onCatch(e)
		return { status: e.response?.status, error: e, data: undefined };

	} finally {
		if (onFinally) onFinally()
		//TODO: stop loading
	}
}

export default apiCall
