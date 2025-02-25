export type User = {
	id: number;
	name: string;
	email: string;
	billing: { isSubscribed: boolean }
}

//Task

export type status = 'pending' | 'in_progress' | 'completed'

// to allow dynamic access to key via strings
interface StringableKeys {
	[key: string]: any
}

export interface Task extends StringableKeys {
	id: number;
	title: string;
	description?: string;
	status: status;
	due_date: string;
	created_at: string;
}
