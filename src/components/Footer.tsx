import { BookLockIcon, MailsIcon } from "lucide-react";
import { FooterLinkProps } from "../utils/types";
import Tooltip from "./Tooltip";

export default function Footer() {
  return (
    <div className="flex flex-row justify-around w-full border-primary border-t-2 py-2 ">
      <FooterLink item={{ tooltip: "Feedback", url: 'https://forms.gle/Ag5NxT8kaZGBq1ZZ6' }}>
        <MailsIcon />
      </FooterLink>
      <FooterLink item={{ tooltip: "Privacy Policy", url: 'https://sites.google.com/view/tubemellow-privacy-policy/home' }}>
        <BookLockIcon/>
      </FooterLink>
      {/* <FooterLink item={{ tooltip: "Website", url: '#' }}>
        <GlobeIcon />
      </FooterLink> */}
    </div>
  )
}

function FooterLink({ item, children }: FooterLinkProps) {

  return (
    <div className="w-full flex justify-center">
     <Tooltip tooltip={item.tooltip}>
      <a href={item.url} target="_blank" className="">
        <div itemType="button" data-ripple-light="true" data-tooltip-target="tooltip" >
          {children}
        </div>
      </a>
     </Tooltip>
    </div>
  )
}

