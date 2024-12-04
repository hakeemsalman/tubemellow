import { useState } from "react";
import { TooltipProps } from "../utils/types";

export default function Tooltip({tooltip, children}: TooltipProps ) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
       {isOpen && <div data-tooltip="tooltip"
        className="absolute z-50 bottom-10 whitespace-normal break-words rounded-lg bg-primary py-1 px-2 font-sans text-sm font-normal text-white focus:outline-none">
        {tooltip}
      </div>}
      <span  onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>{children}</span>
    </>
  )
}
