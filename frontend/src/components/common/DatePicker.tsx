import { dateToLocaleDateString } from "@/lib/utils";
import { ReactNode, useEffect, useRef, useState } from "react";
import { DayPicker, DayPickerProps, PropsSingle } from "react-day-picker";
import "react-day-picker/style.css";
import Popup from "./Popup";


export function DatePicker(props: DayPickerProps & PropsSingle): ReactNode {
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }

    setIsOpen(!isOpen)
  }, [props.selected])


  function Dp(): ReactNode {
    return <DayPicker {...props} />
  }

  const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
      <button type='button' className="border border-gray-100 p-2 rounded-lg" onClick={() => setIsOpen(!isOpen)}>{dateToLocaleDateString(props.selected?.toString() ?? new Date().toString())}</button>
      <Popup
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Dp />
      </Popup>
    </div>
  )
}
