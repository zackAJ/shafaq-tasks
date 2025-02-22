import apiCall from "@/lib/axios.ts"
import { NormalResponse } from "@/types/api"
import { LoginForm, RegisterForm, ValidationErrorBag } from "@/types/forms"
const prefix = "api"

export async function login(form: LoginForm, setErrors: (bag: ValidationErrorBag) => void, setToken: (token: string) => void) {
	return await apiCall<NormalResponse<{ token: string }>>(
		{
			method: "post",
			url: `${prefix}/login`,
			data: form,
			onSuccess: (data) => {
				setToken(data.data.token)
				window.location.replace('/dashboard')
			},
			onFailure: (e) => {
				if (e.response?.data?.errors) setErrors(e.response.data.errors)
			}
		}
	)
}

export async function register(form: RegisterForm, setErrors: (bag: ValidationErrorBag) => void, setToken: (token: string) => void) {
	return await apiCall<NormalResponse<{ token: string }>>(
		{
			method: "post",
			url: `${prefix}/register`,
			data: form,
			onSuccess: (data) => {
				setErrors({})
				setToken(data.data.token)
				window.location.replace('/dashboard')
			},
			onFailure: (e) => {
				if (e.response?.data?.errors) setErrors(e.response.data.errors)
			}
		}
	)
}

export async function logout(clearLocalData: () => void) {
	return await apiCall(
		{
			method: "post",
			url: `${prefix}/logout`,
			onSuccess: () => {
				clearLocalData()
				window.location.replace('/login')
			},
		}
	)
}
