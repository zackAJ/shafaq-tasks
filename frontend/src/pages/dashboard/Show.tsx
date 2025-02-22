import { getTask } from "@/api/task";
import LoadingBtn from "@/components/common/LoadingBtn";
import { dateToLocaleDateString } from "@/lib/utils";
import { Task } from "@/types/models";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function ShowTaskPage() {
	const navigate = useNavigate()
	const taskId = Number(useParams().taskId)
	const [loading, setLoading] = useState(false)
	const [task, setTask] = useState<Task | null>(null)
	async function effect() {
		setLoading(true)

		const { data, error } = await getTask(taskId)
		setLoading(false)
		if (error) return
		setTask(data.data)
	}
	useEffect(() => {
		effect()
	}, [])

	return (
		<main className='w-full'>
			<h1 className="text-xl font-bold mb-4">Create task</h1>
			<section className="bg-white p-4 rounded-lg">
				<div className="mb-4">
					<p className="block text-sm font-medium text-gray-700 mb-2">Title</p>
					<p>{task?.title}</p>
				</div>

				<div className="mb-4">
					<p className="block text-sm font-medium text-gray-700 mb-2">Description</p>
					<p>{task?.description}</p>
				</div>

				<div className="mb-4">
					<p className="block text-sm font-medium text-gray-700 mb-2">Status</p>
					<p>{task?.status}</p>
				</div>

				<div className="mb-4">
					<p className="block text-sm font-medium text-gray-700 mb-2">Due date</p>
					<p>{dateToLocaleDateString(task?.due_date ?? '')}</p>
				</div>

				<LoadingBtn onClick={() => navigate(`/dashboard/${task?.id}/edit`)} loading={loading} type="submit" className="w-[100px] bg-indigo-600 text-white rounded-md py-2 px-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 text-white">
					Edit
				</LoadingBtn>

				<LoadingBtn onClick={()=>console.log('todo')} loading={loading} type="submit" className="w-[100px] bg-red-400 text-white rounded-md py-2 px-4 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 text-white mx-2">
					Delete
				</LoadingBtn>
			</section>
		</main>
	)
};
