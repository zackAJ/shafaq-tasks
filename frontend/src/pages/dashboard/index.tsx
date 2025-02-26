import { deleteTask, getTasks } from "@/api/task";
import { Task } from "@/types/models";
import { useEffect, useState } from "react";
import Paginator from '@/components/common/Paginator'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/shadcn/Table"
import { cn, dateToLocaleDateString } from "@/lib/utils";
import { Pagination } from "@/types/pagination";
import { CirclePlus, Eye, FilePenLine, Trash2 } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import DeleteConfirmationPopup from "@/components/common/DeleteConfirmation";
import PageLoader from "@/components/common/PageLoader";
import EmptyState from "@/components/common/EmptyState";
import { notify } from "@/lib/utils";

const CreateTaskButton = () => {
	return (

		<Link to='/dashboard/create' className="flex gap-x-2 bg-[var(--primary)] rounded-md py-2 px-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 text-white
			">
			<CirclePlus />
			<span>New Task</span>
		</Link>
	)
}

const DashboardPage = () => {
	const [tasks, setTasks] = useState<Task[] | null>(null)
	const [pagination, setPagination] = useState<Pagination>(null)
	const [loading, setLoading] = useState(false)
	const [deletePopup, setDeletePopup] = useState<{ id: number | null; toggle: boolean }>({ id: null, toggle: false })
	const [searchParams, setSearchParams] = useSearchParams()


	function setPage(num: number) {
		setSearchParams({ page: num.toString() })
	}

	const columns = [
		{
			label: 'Title',
			value: 'title',
			className: 'truncate w-full max-w-[200px] sm:max-w-[500px]',
			format: (value: string) => value
		},
		{
			label: 'Due Date',
			value: 'due_date',
			className: 'hidden sm:block w-[150px]',
			format: (value: string) => dateToLocaleDateString(value)
		},
		{
			label: 'Status',
			value: 'status',
			className: 'min-w-[150px]',
			format: (value: string) => value.replace('_', ' ')
		},
		{
			label: 'Action',
			value: 'action',
			className: '',
			format: (value: string) => value
		}
	];

	async function effect() {
		setLoading(true)
		let pageNum = searchParams.get('page')
		if (!pageNum) {
			setPage(1)
			pageNum = '1'
			return
		}

		const { data, error, links, meta } = await getTasks(pageNum)
		setLoading(false)

		if (error) return
		setTasks(data.data)
		setPagination({ links, meta })
	}

	async function handleTaskDeletion() {
		if (!deletePopup.id) return console.error('no task id given')

		setLoading(true)
		const { error } = await deleteTask(deletePopup.id)
		await effect()
		setLoading(false)
		if (error) return
		clearDeletePopup()

		notify('Task deleted').error()
	}

	function clearDeletePopup() {
		setDeletePopup({ toggle: false, id: null })
	}

	useEffect(() => {
		effect()
	}, [searchParams])

	if (loading) return <PageLoader />

	if (tasks?.length === 0) return (
		<EmptyState>
			<CreateTaskButton />
		</EmptyState>
	)

	if (tasks != null)
		return (
			<main className='w-full overflow-x-auto'>
				<div className="flex justify-between items-center mb-4">
					<h1 className="text-xl font-bold">Dashboard</h1>

					<CreateTaskButton />
				</div>

				<Table className="text-sm sm:text-base">
					<TableHeader>
						<TableRow>
							{columns.map(col =>
								<TableHead key={col.value}
									className={cn('first-letter:capitalize font-bold', {
										'sticky right-0 bg-purple-50': col.value === 'action',
										'hidden sm:table-cell': col.value === 'due_date',
									})}>
									{col.label}
								</TableHead>
							)}
						</TableRow>
					</TableHeader>
					<TableBody>
						{tasks.map(task => {
							return (
								<TableRow key={task.id}>
									{
										columns.map(col =>
											col.value === 'action' ?
												<TableCell className="flex gap-x-2 sticky right-0 bg-purple-50" key={col.value + task.id} >
													<Link to={`/dashboard/${task.id}`}><Eye /></Link>
													<Link to={`/dashboard/${task.id}/edit`}><FilePenLine /></Link>
													<button onClick={() => setDeletePopup({ id: task.id, toggle: true })}><Trash2 className="text-red-500" /></button>
												</TableCell> :
												<TableCell className={col.className} key={col.value + task.id}>{col.format(task[col.value])}</TableCell>
										)
									}

								</TableRow>
							)
						})}
					</TableBody>
				</Table>
				<Paginator setPage={setPage} pagination={pagination} />

				<DeleteConfirmationPopup open={deletePopup.toggle} onConfirm={handleTaskDeletion} onClose={clearDeletePopup} />
			</main>
		)
};

export default DashboardPage;
