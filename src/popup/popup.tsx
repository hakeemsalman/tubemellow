import React, { useState } from 'react';
import "../assets/popup.css";

export default function Popup(){

  const [isToggle, setisToggle] = useState<boolean>(false)

  const handleToggle = (e:React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked)
    setisToggle(e.target.checked)
  }
  return (
    <div className="p-3 flex flex-col gap-3">
      <div className="relative inline-block w-11 h-5" >
        <input checked={isToggle ? true : false} id="switch-component" onChange={handleToggle} type="checkbox" className="peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-slate-800 cursor-pointer transition-colors duration-300" />
        <label htmlFor="switch-component" className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer">
        </label>
      </div>
      <h1 className="text-2xl text-white">Hello World</h1>
    </div>
  )
}