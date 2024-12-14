type Props = {
  children: React.ReactNode;
  className?: string; // className can be optional
  onClick:(event: React.MouseEvent<HTMLButtonElement>) => void  // Correctly typed onClick handler
  id?: string; // id can also be optional
  disable?: boolean; // disable remains optional
} & React.ButtonHTMLAttributes<HTMLButtonElement>; // Allow native button props

export default function Button({
  children,
  className = "", // Default to an empty string if no className is provided
  disable = false, // Default disable to false
  onClick,
  id,
  ...props
}: Props) {
  return (
    <button
      onClick={onClick}
      className={className}
      disabled={disable}
      id={id}
      {...props} // Spread any additional props
    >
      {children}
    </button>
  );
}
