import apiCall from "@/lib/axios"
import { NormalResponse, PaginatedResponse } from "@/types/api"
import { CreateTaskForm, UpdateTaskFrom, ValidationErrorBag } from "@/types/forms"
import { Task } from "@/types/models"

const prefix = 'api/v1/tasks'

export async function createTask(form: CreateTaskForm, setErrors: (bag: ValidationErrorBag) => void) {
	return await apiCall<NormalResponse<Task>>(
		{
			method: "post",
			url: `${prefix}`,
			data: form,
			onSuccess: () => {
				setErrors({})
			},
			onFailure: (e) => {
				if (e.response?.data?.errors) setErrors(e.response.data.errors)
			}

		}
	)
}

export async function updateTask(taskId: number, form: UpdateTaskFrom, setErrors: (bag: ValidationErrorBag) => void) {
	return await apiCall<NormalResponse<Task>>(
		{
			method: "put",
			url: `${prefix}/${taskId}`,
			data: form,
			onSuccess: () => {
				setErrors({})
			},
			onFailure: (e) => {
				if (e.response?.data?.errors) setErrors(e.response.data.errors)
			}

		}
	)
}

export async function getTasks(pageNum: string) {
	return await apiCall<PaginatedResponse<Task>>(
		{
			method: "get",
			url: `${prefix}?page=${pageNum}`,
		}
	)
}

export async function getTask(id: number) {
	return await apiCall<NormalResponse<Task>>(
		{
			method: "get",
			url: `${prefix}/${id}`,
		}
	)
}

export async function deleteTask(id: number) {
	return await apiCall<NormalResponse<null>>(
		{
			method: "delete",
			url: `${prefix}/${id}`,
		}
	)
}
