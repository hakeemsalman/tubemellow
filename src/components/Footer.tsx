import { GlobeIcon, LightbulbIcon, MailsIcon } from "lucide-react";
import { FooterLinkProps } from "../utils/types";
import Tooltip from "./Tooltip";

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

  return (
    <div className="w-full flex justify-center">
     <Tooltip tooltip={item.tooltip}>
      <a href={item.url} className="">
        <div itemType="button" data-ripple-light="true" data-tooltip-target="tooltip" >
          {children}
        </div>
      </a>
     </Tooltip>
    </div>
  )
}

