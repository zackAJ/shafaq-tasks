import axios from "../lib/axios.ts"
import { csrf } from "./csrf.ts"

const prefix = "api"

export const login = async (email: string, password: string) => {

	const response = await axios.post(`${prefix}/login`, { email, password }, { withCredentials: true })
	return response.data
}

export const register = async (name: string, email: string, password: string) => {
	const response = await axios.post(`${prefix}/register`, { name, email, password }, { withCredentials: true })
	return response.data
}

export const logout = async () => {
	const response = await axios.post(`${prefix}/logout`, {}, { withCredentials: true })
	return response.data
}
