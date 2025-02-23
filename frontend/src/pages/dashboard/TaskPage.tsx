import { getTask } from "@/api/task";
import { Task } from "@/types/models";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import EditTask from "./partials/EditTask";
import ShowTask from "./partials/ShowTask";
import PageLoader from "@/components/common/PageLoader";

export default function TaskPage() {
	const verb = useParams()['verb']
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


	if (loading || !task) return <PageLoader />

	if (task) return (
		verb === 'edit' ? <EditTask task={task} /> : <ShowTask task={task} />
	)
};
