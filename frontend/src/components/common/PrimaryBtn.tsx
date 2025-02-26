import { cn } from "@/lib/utils";

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> { }
export default function PrimaryBtn(props: Props) {
  return (
    <button {...props} className={cn('bg-indigo-600 text-white rounded-md py-2 px-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 text-white', props.className)}>

    </button>
  )
}
