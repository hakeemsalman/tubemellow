type Props = {
  children: React.ReactNode,
}

export default function Heading({children}: Props) {
  return (
    <span className={`inline text-lg `}>{children}</span>
  )
}
