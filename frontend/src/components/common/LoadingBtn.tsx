import Loading from "@/assets/loading.svg"
import { ReactNode } from "react";
import PrimaryBtn from "./PrimaryBtn";

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
		<PrimaryBtn {...props}>
			{loading ? (<> <img src={Loading} className='h-6 mx-auto' /></>) : (children)}
		</PrimaryBtn>
	)
}

export default LoadingBtn
