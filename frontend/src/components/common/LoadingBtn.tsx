import Loading from "@/assets/loading.svg"

interface LoadingButtonProps extends React.HTMLProps<HTMLButtonElement> {
	loading: boolean;
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
