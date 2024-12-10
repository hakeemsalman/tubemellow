import React from "react"

export type Language = {
  name: string,
  key: string,
  flagKey: string
}

export type Item = {
  id: string,
  title: string,
  htmlId:string,
  checked: boolean,
}
export type isToggleJson = { options: Item[], lang: string}

export type FooterLinkProps = {
  children: React.ReactNode,
  item: {tooltip: string , url: string}
}
export type TooltipProps = {
  children: React.ReactNode,
  tooltip: string,
  direction?: string
}

export type ToggleProp = {
  id: string;
  isChecked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Correct type for onChange
  name: string;
};

export type AccordionProps = {
  title: string,
  id: string,
  children: React.ReactNode
}