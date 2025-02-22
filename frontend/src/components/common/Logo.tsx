import { ReactNode } from "react";
import logo from '@/assets/logo.svg'

interface Props extends React.HTMLProps<HTMLImageElement> {
	className?: string
}

export default function Logo({
	className,
	...props
}: Props): ReactNode {
	return <img src={logo} alt="logo" className={className ??= "mx-auto h-[80px]"} {...props} />
}
