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