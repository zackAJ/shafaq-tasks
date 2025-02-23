import loading from "@/assets/loading.svg"
import { ReactNode } from "react"

export default function PageLoader(): ReactNode {
  return (
    <div className="bg-primary w-screen h-screen grid place-items-center bg-purple-50 absolute top-1/2 left-1/2 -translate-1/2 -translate-y-1/2">
      <img src={loading} className="w-1/12" />
    </div>
  )
}
