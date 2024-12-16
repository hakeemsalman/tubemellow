import { useState } from "react";
import { TooltipProps } from "../utils/types";

export default function Tooltip({tooltip, children, direction = 'bottom-7 -right-4'}: TooltipProps ) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="relative">
      <span  onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)} className="flex">{children}</span>
       {isOpen && <div data-tooltip="tooltip"
        className={`${direction} absolute z-50 whitespace-normal rounded-lg bg-primary py-1 px-2 font-sans text-sm font-normal text-white focus:outline-none`}>
        <span className="text-nowrap">{tooltip}</span>
      </div>}
    </div>
  )
}
