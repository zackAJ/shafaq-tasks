import axios from "@/lib/axios"

export const csrf = async () => {
	const response = await axios.get(`sanctum/csrf-cookie`)
	return response.data
}

