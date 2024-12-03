type Props = {
  children: React.ReactNode,
  className: string,
  onClick: React.MouseEventHandler<HTMLButtonElement>
}
export default function Button({children,className, onClick}: Props) {

  return (
    <button onClick={onClick} className={className}>{children}</button>
  )
}
