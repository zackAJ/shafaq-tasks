import { PropsWithChildren } from 'react'
import Logo from '@/components/common/Logo'

interface Props extends PropsWithChildren {
	title: string,
}

export default function({
	title,
	children,
	...props
}: Props) {
	return (

		<div className="bg-white p-4 sm:p-8 rounded-lg shadow-md min-h-[400px] mx-auto w-[95%] sm:w-96" {...props}>
			<h1 className="text-2xl font-bold mb-6 text-center">{title}</h1>
			<Logo />
			{children}
		</div>
	)
}
