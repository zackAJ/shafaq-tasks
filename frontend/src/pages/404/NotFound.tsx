import { Link } from "react-router"

export default function NotFound() {
	return (
		<main className="bg-purple-50 flex flex-col justify-center items-center w-screen h-screen">
			<p className="font-bold text-3xl">404 | NOT FOUND</p>
			<Link to='/dashboard' className="bg-indigo-600 text-white rounded-md py-2 px-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 text-white" >
				Go Home
			</Link>
		</main>
	)
}
