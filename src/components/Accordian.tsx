import { MinusIcon, PlusIcon } from "lucide-react"
import { AccordionProps } from "../utils/types"
import React, { useRef, useState } from "react"
import Button from "./Button";



export default function Accordian({ title, id, children }: AccordionProps) {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null); // Reference to calculate content height dynamically
  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsOpen((prev) => !prev);
  }
  return (
    <div className="border-b border-slate-200">
      <Button
        onClick={handleToggle}
        id={id}
        className="w-full flex justify-between items-center py-2 text-slate-800"
      >
        <span className="text-lg">{title}</span>
        <span className="text-slate-800 transition-transform duration-300">
          {isOpen ? <MinusIcon size={16} /> : <PlusIcon size={16} />}
        </span>
      </Button>
      <div
        ref={contentRef}
        className={`overflow-hidden transition-[max-height] duration-300 ease-in-out`}
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0",
        }}
      >
        <div className="py-3">{children}</div>
      </div>
    </div>
  );
}