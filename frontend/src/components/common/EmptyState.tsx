
import { ReactNode, PropsWithChildren } from "react";
import swordFighting from '@/assets/swordFighting.svg'


export default function EmptyState(props: PropsWithChildren) {
  return <div className='grid place-items-center h-[80vh] w-full'>
    <img src={swordFighting} className="max-w-[800px] w-full" />
    <div>
      <p className="text-gray-500 my-4">It's been real quiet lately</p>
      {props.children}
    </div>
  </div>
}
