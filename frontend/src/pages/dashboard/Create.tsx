import { createTask } from "@/api/task";
import { DatePicker } from "@/components/common/DatePicker";
import Dropdown, { DropdownProps } from "@/components/common/Dropdown";
import FormError from "@/components/common/FormError";
import LoadingBtn from "@/components/common/LoadingBtn";
import { statusEnum } from "@/consts/task";
import { CreateTaskForm, ValidationErrorBag } from "@/types/forms";
import { useState } from "react";

const CreateTaskPage = () => {
	const [errors, setErrors] = useState<ValidationErrorBag>({})
	const [loading, setLoading] = useState(false)
	const [form, setForm] = useState<CreateTaskForm>({
		title: '',
		description: '',
		status: 'pending',
		due_date: new Date(),
	})

	const selectStatus: DropdownProps['onSelect'] = ({ option, setSelectedOption, setIsOpen }) => {
		setSelectedOption(option)
		setIsOpen(false)
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setLoading(true)
		await createTask(form, setErrors);
		setLoading(false)
	};

	return (
		<main className='w-full'>
			<h1 className="text-xl font-bold mb-4">Create task</h1>
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
						onBlur={(e) => setForm({ ...form, title: e.target.value.trim() })}
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
						onSelect={date => setForm({ ...form, due_date: date ?? new Date() })}
					/>
					<FormError errors={errors} name={"due_date"} />
				</div>



				<LoadingBtn loading={loading} type="submit" className="w-[100px] bg-indigo-600 text-white rounded-md py-2 px-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 text-white">
					Save
				</LoadingBtn>
			</form>
		</main>
	)
};

export default CreateTaskPage;
