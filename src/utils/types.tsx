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