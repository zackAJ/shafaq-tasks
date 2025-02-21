import { useUserStore } from "@/store/user";

const DashboardPage = () => {

	const user = useUserStore().user

	return (
		<main>
			<h1>Dashboard</h1>
			<div>
				welcome {user?.name}
			</div>
		</main>
	)
};

export default DashboardPage;
