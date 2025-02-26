import { ComponentProps, useState } from "react";
import Dropdown from "@/components/common/Dropdown";
import Avatar from "@/assets/avatar.svg";
import { logout } from "@/api/auth";
import { useAuthStore } from "@/store/auth";
import { useUserStore } from "@/store/user";
import PageLoader from "@/components/common/PageLoader";
const options = ["Logout"]

type OnClickType = ComponentProps<typeof Dropdown>["onSelect"];



export default function ProfileDropdown() {
	const [authStore, userStore] = [useAuthStore(), useUserStore()]
	const [loading, setLoading] = useState(false)

	const onClick: OnClickType = async (utils) => {
		switch (utils.option) {
			case 'Logout':
				setLoading(true)
				await logout(
					() => {
						authStore.clear()
						userStore.clear()
					}
				)
				setLoading(false)
				break;
		}


		utils.setIsOpen(false)
	}

	function Placeholder() {
		return (<div className="flex gap-2 items-center">
			<img src={Avatar} className="rounded-full w-[20px]" />
			<span>{userStore.user?.name}</span>
			<span className="text-xs text-indigo-500 capitalize">{userStore.user?.billing.isSubscribed ? 'premium' : 'freemium'}</span>
		</div>)
	}

	if (loading) return <PageLoader />

	return <Dropdown options={options} placeholder={<Placeholder />} onSelect={onClick} />
}
