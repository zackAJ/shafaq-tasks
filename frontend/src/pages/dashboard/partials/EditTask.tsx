//@ts-nocheck
import { updateTask } from "@/api/task";
import LinkBack from "@/components/common/BackLink";
import { DatePicker } from "@/components/common/DatePicker";
import Dropdown, { DropdownProps } from "@/components/common/Dropdown";
import FormError from "@/components/common/FormError";
import LoadingBtn from "@/components/common/LoadingBtn";
import { statusEnum } from "@/consts/task";
import { formatDate, notify } from "@/lib/utils";
import { UpdateTaskFrom, ValidationErrorBag } from "@/types/forms";
import { Task } from "@/types/models";
import { deepEqual } from "assert";
import { useMemo, useState } from "react";
import { useParams } from "react-router";

interface Props {
	task: Task,
	setTask: (task: Task) => void
}

export default function EditTask({ task, setTask }: Props) {
	const taskId = Number(useParams().taskId)
	const [errors, setErrors] = useState<ValidationErrorBag>({})
	const [loading, setLoading] = useState(false)
	const [form, setForm] = useState<UpdateTaskFrom>({
		title: task.title,
		description: task.description ?? '',
		status: task.status,
		due_date: task.due_date,
	})

	const isDisabled = useMemo(() => {
		return JSON.stringify({ ...form }) === JSON.stringify({ ...task, created_at: undefined, id: undefined })
	}, [form, task])

	const selectStatus: DropdownProps['onSelect'] = ({ option, setSelectedOption, setIsOpen }) => {
		setSelectedOption(option)
		setIsOpen(false)
		setForm({ ...form, status: option })
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setLoading(true)
		const { error } = await updateTask(taskId, form, setErrors);
		setLoading(false)

		if (error) return

		setTask({ ...task, ...form })
		notify('Task updated').success()
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



				<LoadingBtn disabled={isDisabled} loading={loading} type="submit" className="w-[100px]">
					Save
				</LoadingBtn>
			</form>
		</main >
	)
};
