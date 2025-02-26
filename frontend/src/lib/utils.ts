import { UiStore } from "@/store/ui";
import { UserStore } from "@/store/user";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Slide, toast } from "react-toastify";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function dateToLocaleDateString(
	date: string | Date,
	formatOptions: Intl.DateTimeFormatOptions = { dateStyle: 'medium' }
) {

	date = new Date(date);
	return date.toLocaleString('en-US', formatOptions)
}

export function formatDate(date: Date): string {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
};

export function premiumChecker(userStore: UserStore, uiStore: UiStore, handler: () => void) {
	if (!userStore.user?.billing.isSubscribed) {
		uiStore.togglePremiumPopup(true)
		return
	}

	handler()
}


export function notify(message: string) {
	return {
		error: () =>
			toast.error(message, {
				position: "bottom-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
				transition: Slide,
			}),

		success: () => toast.success(message, {
			position: "bottom-right",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
			transition: Slide,
		})
	}
}
