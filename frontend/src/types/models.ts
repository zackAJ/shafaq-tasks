export type User = {
	id: number;
	name: string;
	email: string;
}

//Task

export type status = 'pending' | 'in_progress' | 'completed'

export type Task = {
	id: number;
	title: string;
	description?: string;
	status: status;
	due_date: string;
	created_at: string;
}
