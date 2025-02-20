import apiCall from "@/lib/axios.ts"
import { LoginForm, RegisterForm, ValidationErrorBag } from "@/types/forms"
const prefix = "api"

export async function login(form: LoginForm, setErrors: (bag: ValidationErrorBag) => void, setToken: (token: string) => void) {
	return await apiCall<{ token: string }>(
		{
			method: "post",
			url: `${prefix}/login`,
			data: form,
			onSuccess: (data) => {
				setToken(data.token)
				window.location.reload()
			},
			onFailure: (e) => {
				if (e.response?.data?.errors) setErrors(e.response.data.errors)
			}
		}
	)
}

export async function register(form: RegisterForm, setErrors: (bag: ValidationErrorBag) => void, setToken: (token: string) => void) {
	return await apiCall<{ token: string }>(
		{
			method: "post",
			url: `${prefix}/register`,
			data: form,
			onSuccess: (data) => {
				setErrors({})
				setToken(data.token)
				window.location.reload()
			},
			onFailure: (e) => {
				if (e.response?.data?.errors) setErrors(e.response.data.errors)
			}
		}
	)
}

export async function logout(deleteToken: () => void) {
	return await apiCall(
		{
			method: "post",
			url: `${prefix}/logout`,
			onSuccess: () => {
				deleteToken()
				window.location.reload()
			},
		}
	)
}
