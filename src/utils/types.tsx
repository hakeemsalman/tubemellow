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

export type Bookmark = {
  id: string,
  url: string,
  title: string,
  channel: string,
  checked: boolean,
  image: string
}

export type BookmarkProps = {
  bookmarkList: Bookmark[],
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
export type BookmarkCardProps = {
  title: string,
  channel: string,
  image: string,
  id: string,
  url: string,
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}