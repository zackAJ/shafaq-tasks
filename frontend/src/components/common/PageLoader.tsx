import loading from "@/assets/loading.svg"
import { ReactNode } from "react"

export default function PageLoader(): ReactNode {
  return (
    <div className="bg-primary w-screen h-screen grid place-items-center bg-purple-50">
      <img src={loading} className="w-1/12" />
    </div>
  )
}
