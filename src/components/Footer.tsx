import { GlobeIcon, LightbulbIcon, MailsIcon } from "lucide-react";
import { useState } from "react";
import { FooterLinkProps } from "../utils/types";

export default function Footer() {
  return (
    <div className="flex flex-row justify-around w-full border-primary border-t-2 py-2 ">
      <FooterLink item={{ tooltip: "Mail", url: '#' }}>
        <MailsIcon />
      </FooterLink>
      <FooterLink item={{ tooltip: "Feature Request", url: '#' }}>
        <LightbulbIcon />
      </FooterLink>
      <FooterLink item={{ tooltip: "Website", url: '#' }}>
        <GlobeIcon />
      </FooterLink>
    </div>
  )
}

function FooterLink({ item, children }: FooterLinkProps) {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="w-full flex justify-center">
      {isOpen && <div data-tooltip="tooltip"
        className="absolute z-50 bottom-10 whitespace-normal break-words rounded-lg bg-primary py-1 px-2 font-sans text-sm font-normal text-white focus:outline-none">
        {item.tooltip}
      </div>}
      <a href={item.url} className="" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
        <div itemType="button" data-ripple-light="true" data-tooltip-target="tooltip" >
          {children}
        </div>
      </a>
    </div>
  )
}

