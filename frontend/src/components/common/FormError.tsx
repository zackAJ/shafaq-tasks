import { ValidationErrorBag } from "@/types/forms"

interface Props {
	errors: ValidationErrorBag, name: string
}

export default function({ errors, name }: Props) {

	if (errors[name]?.length)
		return errors[name]
			.map((err, index) => {
				return <p key={index} className="text-red-500 text-sm my-2">{err}</p>
			})

	return (<span></span>)
}
