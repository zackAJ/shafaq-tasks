import { ComponentProps } from "react";
import Dropdown from "@/components/common/Dropdown";
import Avatar from "@/assets/avatar.svg";
import { logout } from "@/api/auth";
import { useAuthStore } from "@/store/auth";
import { useUserStore } from "@/store/user";
const options = ["Logout"]

type OnClickType = ComponentProps<typeof Dropdown>["onSelect"];



export default function ProfileDropdown() {
	const [authStore, userStore] = [useAuthStore(), useUserStore()]
	const onClick: OnClickType = async (utils) => {
		switch (utils.option) {
			case 'Logout':
				await logout(
					() => {
						authStore.clear()
						userStore.clear()
					}
				)
				break;
		}


		utils.setIsOpen(false)
	}

	function Placeholder() {
		return (<div className="flex gap-2 items-center">
			<img src={Avatar} className="rounded-full w-[20px]" />
			<span>{userStore.user?.name}</span>
		</div>)
	}

	return <Dropdown options={options} placeholder={<Placeholder />} onSelect={onClick} />
}
