import { useUserStore } from "@/store/user";

const DashboardPage = () => {

	const user = useUserStore().user

	return (
		<>
			<h1>Dashboard</h1>
			<div>
				welcome {user?.name}
			</div>
		</>
	)
};

export default DashboardPage;
