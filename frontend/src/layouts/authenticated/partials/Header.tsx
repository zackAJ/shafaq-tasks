import { ReactNode, useState } from "react";
import Logo from '@/components/common/Logo'
import ProfileDropdown from "./ProfileDropDown";
import { useUserStore } from "@/store/user";
import { premiumChecker } from "@/lib/utils";
import Popup from "@/components/common/Popup";
import { User } from "@/types/models";
import LoadingBtn from "@/components/common/LoadingBtn";
import { getQuote } from "@/api/quote";
import { useUiStore } from "@/store/ui";

interface Props extends React.HTMLProps<HTMLDivElement> { }

export default function Header(props: Props): ReactNode {
	const userStore = useUserStore()
	const uiStore = useUiStore()
	const [isOpen, setIsOpen] = useState(false)
	const [quote, setQuote] = useState('')
	const [loading, setLoading] = useState(false)

	async function handleGetQuote() {
		setLoading(true)
		const { data, error } = await getQuote()
		setLoading(false)
		if (error) return

		setQuote(data.data.quote)
		setIsOpen(true)
	}

	function closeQuotePopup() {
		setIsOpen(false)
		setQuote('')
	}

	return <header {...props} >
		<Logo className='h-[50px]' />
		<div className="flex items-center gap-2">
			<LoadingBtn
				loading={loading}
				data-premium
				onClick={() => premiumChecker(userStore, uiStore, handleGetQuote)}
				className="py-1 px-2 border text-indigo-500 rounded-lg w-20"
			>
				Wisdom
			</LoadingBtn>
			<ProfileDropdown />
		</div>
		<Popup open={isOpen}>
			<p className="text-black">{quote}</p>
			<button onClick={closeQuotePopup} className="w-full bg-indigo-600 text-white rounded-md py-2 px-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 text-white mt-4">
				I agree
			</button>
		</Popup>
	</header >
}
