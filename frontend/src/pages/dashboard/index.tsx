import { getTasks } from "@/api/task";
import { Task } from "@/types/models";
import { useEffect, useState } from "react";
import Paginator from '@/components/common/Paginator'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/shadcn/Table"
import { dateToLocaleDateString } from "@/lib/utils";
import { Pagination } from "@/types/pagination";

const DashboardPage = () => {
	const [tasks, setTasks] = useState<Task[]>([])
	const [pagination, setPagination] = useState<Pagination>(null)

	const columns = [
		{
			label: 'Title',
			value: 'title',
			className: 'font-bold',
			format: (value: string) => value
		},
		{
			label: 'Due Date',
			value: 'due_date',
			className: 'font-bold w-[300px]',
			format: (value: string) => dateToLocaleDateString(value)
		},
		{
			label: 'Status',
			value: 'status',
			className: 'font-bold max-w-[300px]',
			format: (value: string) => value.replace('_', ' ')
		},
		{
			label: 'Action',
			value: 'action',
			className: 'font-bold font-medium max-w-[300px]',
			format: (value: string) => value
		}
	];

	async function asyncFatch() {
		const { data, error } = await getTasks()
		if (error) return
		setTasks(data.data)
		setPagination({ links: data.links, meta: data.meta })
	}

	useEffect(() => {
		asyncFatch()
	}, [])

	return (
		<main className='w-full'>
			<h1 className="text-xl font-bold">Dashboard</h1>

			<Table>
				<TableCaption>Your tasks</TableCaption>
				<TableHeader>
					<TableRow>
						{columns.map(col => <TableHead key={col.value} className={'first-letter:capitalize !w-[600px]' + col.className}>{col.label}</TableHead>)}
					</TableRow>
				</TableHeader>
				<TableBody>
					{tasks.map(task => {
						return (
							<TableRow key={task.id}>
								{
									columns.map(col =>
										col.value === 'action' ?
											<TableCell key={col.value + task.id} >Action</TableCell> :
											<TableCell key={col.value + task.id}>{col.format(task[col.value])}</TableCell>
									)
								}

							</TableRow>
						)
					})}
				</TableBody>
			</Table>
			<Paginator pagination={pagination} />
		</main>
	)
};

export default DashboardPage;
