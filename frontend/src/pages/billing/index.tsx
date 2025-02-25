import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

export default function BillingRedirectPage() {

	const [searchParams] = useSearchParams()
	const [counter, setCounter] = useState(3)

	const navigate = useNavigate()


	const interval = setInterval(() => {
		setCounter(counter - 1)
	}, 1000)

	useEffect(() => {
		setTimeout(() => {
			clearInterval(interval)
			navigate('/dashboard', { replace: true })
		}, 3000);
	}, [])

	return (
		<main className="w-full h-full text-xl sm:text-3xl font-bold grid place-items-center" >
			<p>
				{searchParams.get('status') === 'success' ? 'Your subscription is now active' : 'Payment canceled'}
			</p>
			<p>{counter}</p>
		</main >
	)
}
