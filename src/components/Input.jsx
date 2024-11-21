import React from 'react'

export default function Input({ onChange, isToggle, id}) {

  const handleToggle = (e) => {
    onChange(e);
  }

  const isChecked = isToggle.find(item => item.id === id)?.checked || false;

  return (
    <div className="relative inline-block w-11 h-5" >
      <input checked={isChecked ? true : false} id={id} onChange={handleToggle} type="checkbox" className="peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-slate-800 cursor-pointer transition-colors duration-300" />
      <label htmlFor={id} className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer"></label>
    </div>
  )
}
