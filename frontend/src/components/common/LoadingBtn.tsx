import Loading from "@/assets/loading.svg"
import { ReactNode } from "react";

interface LoadingButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	loading: boolean;
	children: ReactNode;
}

const LoadingBtn = ({
	children,
	loading,
	...props
}: LoadingButtonProps) => {
	return (
		<button {...props}>
			{loading ? (<> <img src={Loading} className='h-6 mx-auto' /></>) : (children)}
		</button>
	)
}

export default LoadingBtn
