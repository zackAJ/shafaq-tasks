import { deleteTask, getTasks } from "@/api/task";
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
import { Eye, FilePenLine, Trash2 } from "lucide-react";
import { Link } from "react-router";
import DeleteConfirmationPopup from "@/components/common/DeleteConfirmation";
import PageLoader from "@/components/common/PageLoader";

const DashboardPage = () => {
	const [tasks, setTasks] = useState<Task[]>([])
	const [pagination, setPagination] = useState<Pagination>(null)
	const [loading, setLoading] = useState(false)
	const [deletePopup, setDeletePopup] = useState({ id: null, toggle: false })

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

	async function asyncFetch() {
		const { data, error, links, meta } = await getTasks()
		if (error) return
		setTasks(data.data)
		setPagination({ links, meta })
	}

	async function handleTaskDeletion() {
		if (!deletePopup.id) return console.error('no task id given')

		setLoading(true)
		const { error } = await deleteTask(deletePopup.id)
		await asyncFetch()
		setLoading(false)
		if (error) return
		clearDeletePopup()
	}

	function clearDeletePopup() {
		setDeletePopup({ toggle: false, id: null })
	}

	useEffect(() => {
		asyncFetch()
	}, [])

	if (loading) return <PageLoader />

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
											<TableCell className="flex gap-x-2" key={col.value + task.id} >
												<Link to={`/dashboard/${task.id}`}><Eye /></Link>
												<Link to={`/dashboard/${task.id}/edit`}><FilePenLine /></Link>
												<button onClick={() => setDeletePopup({ id: task.id, toggle: true })}><Trash2 className="text-red-500" /></button>
											</TableCell> :
											<TableCell key={col.value + task.id}>{col.format(task[col.value])}</TableCell>
									)
								}

							</TableRow>
						)
					})}
				</TableBody>
			</Table>
			<Paginator pagination={pagination} />

			<DeleteConfirmationPopup open={deletePopup.toggle} onConfirm={handleTaskDeletion} onClose={clearDeletePopup} />
		</main>
	)
};

export default DashboardPage;
