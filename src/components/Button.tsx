export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode,
  className: string,
  onClick: React.MouseEventHandler<HTMLButtonElement>,
  id: string
}
export default function Button({children,className, onClick,id, ...props}: Props) {

  return (
    <button onClick={onClick} className={className} {...props} id={id}>{children}</button>
  )
}
