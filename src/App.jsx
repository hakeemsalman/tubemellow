import { useState } from 'react'
import './App.css'
import { PowerIcon, SunIcon } from 'lucide-react'

function App() {
  const [isToggle, setisToggle] = useState(false)

  const handleToggle = (e) => {
    console.log(e.target.checked)
    setisToggle(e.target.checked)
  }

  return (
    <div className="p-3 flex flex-col gap-3 w-full ">
      <nav className='flex flex-row justify-between'>
        <div className='flex flex-row gap-3'>
          <img src='/assets/icon-32.png' />
          <span className='text-lg font-bold text-blue-700'>Tube Mellow</span>
        </div>
        <div className='flex flex-row gap-2'>
        <button className=''>
          <PowerIcon size={20}/>
        </button>
        </div>
      </nav>
      <div className="relative inline-block w-11 h-5" >
        <input checked={isToggle ? true : false} id="switch-component" onChange={handleToggle} type="checkbox" className="peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-slate-800 cursor-pointer transition-colors duration-300" />
        <label htmlFor="switch-component" className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer">
        </label>
      </div>
      <h1 className="text-2xl text-white">Hello World</h1>
    </div>
  )
}

export default App
