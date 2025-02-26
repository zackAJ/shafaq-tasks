import { useState } from "react";
import LoadingBtn from "./LoadingBtn";
import Popup, { PopupProps } from "./Popup";
import { checkout } from "@/api/billing";

export default function PremiumPopup(props: PopupProps) {
  const [loading, setLoading] = useState(false);

  async function subscriptionHandler() {
    setLoading(true)
    await checkout()
    setLoading(false)
  }

  return (
    <Popup {...props}>
      <div>
        <h1 className="text-3xl my-5 text-indigo-500 font-bold" >
          Premium subscription
        </h1>
        <p className="font-semibold">
          Subscribe to shafaq's premium plan and enjoy quality life saving features.
        </p>

        <p className="my-5 bg-gray-100 rounded-xl p-2 font-semibold">
          Get wisdom quotes, increase motivation to finish your damn tasks
        </p>

        <LoadingBtn
          data-tooltip='Use fake credit card: 4242 4242 4242 4242'
          loading={loading}
          onClick={subscriptionHandler} className="w-full mt-4"
        >
          Subscribe
        </LoadingBtn>
      </div>
    </Popup>
  )
}
