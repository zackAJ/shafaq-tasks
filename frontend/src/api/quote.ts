import apiCall from "@/lib/axios"
import { NormalResponse } from "@/types/api"

const prefix = 'api/v1/quote'

export async function getQuote() {
	return await apiCall<NormalResponse<{ quote: string }>>(
		{
			method: "get",
			url: `${prefix}`
		}
	)
}
