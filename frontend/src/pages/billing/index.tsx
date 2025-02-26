import { notify } from "@/lib/utils";
import { useEffect } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router";

export default function BillingRedirectPage() {

	const [searchParams] = useSearchParams()

	const navigate = useNavigate()

	useEffect(() => {
		setTimeout(() => {
			if (searchParams.get('status') === 'success') {
				notify('Subscription is now active').success()
			}
			else {
				notify('Payment canceled').error()
			}

			navigate('/dashboard', { replace: true })
		}, 100);
	}, [])

	return (
		<Navigate to='/dashboard' />
	)
}
