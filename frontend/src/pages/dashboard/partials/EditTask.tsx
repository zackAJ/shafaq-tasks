//@ts-nocheck
import { updateTask } from "@/api/task";
import LinkBack from "@/components/common/BackLink";
import { DatePicker } from "@/components/common/DatePicker";
import Dropdown, { DropdownProps } from "@/components/common/Dropdown";
import FormError from "@/components/common/FormError";
import LoadingBtn from "@/components/common/LoadingBtn";
import { statusEnum } from "@/consts/task";
import { formatDate } from "@/lib/utils";
import { UpdateTaskFrom, ValidationErrorBag } from "@/types/forms";
import { Task } from "@/types/models";
import { useState } from "react";
import { useParams } from "react-router";

interface Props {
	task: Task
}


export default function EditTask({ task }: Props) {
	const taskId = Number(useParams().taskId)
	const [errors, setErrors] = useState<ValidationErrorBag>({})
	const [loading, setLoading] = useState(false)
	const [form, setForm] = useState<UpdateTaskFrom>({
		title: task.title,
		description: task.description ?? '',
		status: task.status,
		due_date: task.due_date,
	})

	const selectStatus: DropdownProps['onSelect'] = ({ option, setSelectedOption, setIsOpen }) => {
		setSelectedOption(option)
		setIsOpen(false)
		setForm({ ...form, status: option })
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setLoading(true)
		await updateTask(taskId, form, setErrors);
		setLoading(false)
	};

	function onDateSelect(date: any) {
		if (!date) return
		setForm({
			...form,
			due_date: formatDate(date)
		})
	}

	return (
		<main className='w-full'>
			<div className='flex gap-x-4 items-center mb-4'>
				<LinkBack />
				<h1 className="text-xl font-bold">
					Edit task {task.id}
				</h1>
			</div>
			<form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg">
				<div className="mb-4">
					<label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
					<input
						type="text"
						id="name"
						value={form.title}
						onChange={(e) => setForm({ ...form, title: e.target.value })}
						onBlur={(e) => setForm({ ...form, title: e.target.value.trim() })}
						required
					/>
					<FormError errors={errors} name={"name"} />
				</div>

				<div className="mb-4">
					<label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
					<textarea
						className="w-full"
						id="description"
						value={form.description ?? ''}
						onChange={(e) => setForm({ ...form, description: e.target.value })}
						onBlur={(e) => setForm({ ...form, description: e.target.value.trim() })}
					/>
					<FormError errors={errors} name={"description"} />
				</div>

				<div className="mb-4">
					<label htmlFor="title" className="block text-sm font-medium text-gray-700">Status</label>
					<Dropdown options={statusEnum} defaultOption={form.status} onSelect={selectStatus} />
					<FormError errors={errors} name={"status"} />
				</div>

				<div className="mb-4">
					<label htmlFor="due_date" className="block text-sm font-medium text-gray-700">Due date</label>
					<DatePicker
						mode="single"
						selected={form.due_date}
						onSelect={onDateSelect}
					/>
					<FormError errors={errors} name={"due_date"} />
				</div>



				<LoadingBtn loading={loading} type="submit" className="w-[100px] bg-indigo-600 text-white rounded-md py-2 px-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 text-white">
					Save
				</LoadingBtn>
			</form>
		</main >
	)
};
