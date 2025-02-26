import apiCall from "@/lib/axios"
import { NormalResponse } from "@/types/api"

const prefix = 'api/v1'

export async function checkout() {
	return await apiCall<NormalResponse<{ checkoutLink: string }>>(
		{
			method: "post",
			url: `${prefix}/subscription-checkout`,
			data: {
				success_url: import.meta.env.VITE_FRONTEND_URL + '/billing?status=success',
				cancel_url: import.meta.env.VITE_FRONTEND_URL+ '/billing?status=canceled',
			},
			onSuccess: (data) => {
				window.location.replace(data.data.checkoutLink)
			},
		}
	)
}
