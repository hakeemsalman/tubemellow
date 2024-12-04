type Props = {
  id: string;
  isChecked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Correct type for onChange
  name: string;
};

export default function Toggle({ onChange, isChecked, id, name}: Props) {

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  }

  return (
    <div className="relative inline-block w-11 h-5" >
      <input checked={isChecked} id={id} onChange={handleToggle} name={name} type="checkbox" className="peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-primary cursor-pointer transition-colors duration-300" />
      <label htmlFor={id} className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-primary cursor-pointer"></label>
    </div>
  )
}
