import apiCall from "@/lib/axios"
import { NormalResponse } from "@/types/api"
import { User } from "@/types/models"

const prefix = 'api/v1'

export async function getUser() {
	return await apiCall<NormalResponse<User>>(
		{
			method: "get",
			url: `${prefix}/me`,
		}
	)
}
