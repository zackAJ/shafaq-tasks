import { FC } from "react";
import Logo from '@/components/common/Logo'
import ProfileDropdown from "./ProfileDropDown";

interface Props extends React.HTMLProps<HTMLDivElement> { }

export default function Header(props: Props): FC {
	return <header {...props} >
		<Logo className='h-[50px]' />
		<ProfileDropdown />
	</header >
}
