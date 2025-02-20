import apiCall from "@/lib/axios"

export async function csrf() {
	return await apiCall({
		method: 'get',
		url: `sanctum/csrf-cookie`,
	})
}
