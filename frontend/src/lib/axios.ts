import Axios from 'axios'
import { csrf } from '../api/csrf';

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

axios.interceptors.request.use(function(config) {
	config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
	return config;
}, function(error) {
	return Promise.reject(error);
});

axios.interceptors.response.use(
	response => response,
	async error => {
		//unauthenticated
		if (error.status === 401) {
			// userStore().clear()
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

export default axios
