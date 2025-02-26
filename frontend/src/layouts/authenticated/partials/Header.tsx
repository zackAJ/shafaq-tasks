import { ReactNode, useState } from "react";
import Logo from '@/components/common/Logo'
import ProfileDropdown from "./ProfileDropDown";
import { useUserStore } from "@/store/user";
import { premiumChecker } from "@/lib/utils";
import Popup from "@/components/common/Popup";
import LoadingBtn from "@/components/common/LoadingBtn";
import { getQuote } from "@/api/quote";
import { useUiStore } from "@/store/ui";
import { Link } from "react-router";
import PrimaryBtn from "@/components/common/PrimaryBtn";

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
		<Link to='/dashboard'>
			<Logo className='h-[50px]' />
		</Link>
		<div className="flex items-center gap-2">
			<LoadingBtn
				loading={loading}
				data-premium
				onClick={() => premiumChecker(userStore, uiStore, handleGetQuote)}
				className="py-1 px-2 border rounded-lg w-20"
			>
				Wisdom
			</LoadingBtn>
			<ProfileDropdown />
		</div>
		<Popup open={isOpen}>
			<p className="text-black">{quote}</p>
			<PrimaryBtn onClick={closeQuotePopup} className="w-full mt-4">
				I agree
			</PrimaryBtn>
		</Popup>
	</header >
}
