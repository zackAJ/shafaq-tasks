import logo from '@/assets/logo.svg'
import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
	title: string,
}

export default function({
	title,
	children,
	...props
}: Props) {
	return (

		<div className="bg-white p-8 rounded-lg shadow-md w-96 min-h-[400px] mx-auto" {...props}>
			<h1 className="text-2xl font-bold mb-6 text-center">{title}</h1>
			<img src={logo} alt="logo" className='mx-auto h-[80px]' />
			{children}
		</div>
	)
}
