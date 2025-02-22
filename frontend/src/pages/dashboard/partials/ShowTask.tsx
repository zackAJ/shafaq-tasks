import LinkBack from "@/components/common/BackLink";
import LoadingBtn from "@/components/common/LoadingBtn";
import { dateToLocaleDateString } from "@/lib/utils";
import { Task } from "@/types/models";
import { useState } from "react";
import { useNavigate } from "react-router";

interface Props {
	task: Task
}

export default function ShowTask({ task }: Props) {
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)

	return (
		<main className='w-full'>
			<div className='flex gap-x-4 items-center mb-4'>
				<LinkBack />
				<h1 className="text-xl font-bold">
					Show task
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
					<p>{task?.status}</p>
				</div>

				<div className="mb-4">
					<p className="block text-sm font-medium text-gray-700 mb-2">Due date</p>
					<p>{dateToLocaleDateString(task?.due_date ?? '')}</p>
				</div>

				<button onClick={() => navigate(`/dashboard/${task?.id}/edit`)} type="button" className="w-[100px] bg-indigo-600 text-white rounded-md py-2 px-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 text-white">
					Edit
				</button>

				<LoadingBtn onClick={() => console.log('todo')} loading={loading} type="button" className="w-[100px] bg-red-400 text-white rounded-md py-2 px-4 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 text-white mx-2">
					Delete
				</LoadingBtn>
			</section>
		</main>
	)
};
