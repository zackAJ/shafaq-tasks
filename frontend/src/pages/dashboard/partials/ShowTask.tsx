import { deleteTask } from "@/api/task";
import LinkBack from "@/components/common/BackLink";
import DeleteConfirmationPopup from "@/components/common/DeleteConfirmation";
import PageLoader from "@/components/common/PageLoader";
import PrimaryBtn from "@/components/common/PrimaryBtn";
import { dateToLocaleDateString, notify } from "@/lib/utils";
import { Task } from "@/types/models";
import { useState } from "react";
import { useNavigate } from "react-router";

interface Props {
	task: Task
}

export default function ShowTask({ task }: Props) {
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)

	const [deletePopup, setDeletePopup] = useState({ toggle: false })

	async function handleTaskDeletion() {
		if (!task?.id) return console.error('no id')
		setLoading(true)
		const { error } = await deleteTask(task.id)
		setLoading(false)

		if (error) return

		notify('Task deleted').error()
		navigate('/dashboard')
	}

	if (loading) return <PageLoader />

	return (
		<main className='w-full'>
			<div className='flex gap-x-4 items-center mb-4'>
				<LinkBack />
				<h1 className="text-xl font-bold">
					Task {task.id}
				</h1>
			</div>
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
					<p>{task?.status.replace('_', ' ')}</p>
				</div>

				<div className="mb-4">
					<p className="block text-sm font-medium text-gray-700 mb-2">Due date</p>
					<p>{dateToLocaleDateString(task?.due_date ?? '')}</p>
				</div>

				<PrimaryBtn onClick={() => navigate(`/dashboard/${task?.id}/edit`)} type="button" className="w-[100px]">
					Edit
				</PrimaryBtn>

				<PrimaryBtn onClick={() => setDeletePopup({ toggle: true })} type="button" className="w-[100px] bg-red-400 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 mx-2">
					Delete
				</PrimaryBtn>
			</section>

			<DeleteConfirmationPopup open={deletePopup.toggle} onConfirm={handleTaskDeletion} onClose={() => setDeletePopup({ toggle: false })} />
		</main>
	)
};
