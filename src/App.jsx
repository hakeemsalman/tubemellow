import { useState } from 'react'
import './App.css'
import { PowerIcon, SunIcon } from 'lucide-react'
import Input from './components/Input'
import Title from './components/Title'
import Heading from './components/Heading'
import Button from './components/Button'
function App() {
  const ytMapIds = [
    {
      id: 'yt-tm-home-feed',
      checked: false
    },
    {
      id: 'yt-tm-search-bar',
      checked: false
    },
  ]
  const [isToggle, setisToggle] = useState(ytMapIds)

  const handleToggle = (e) => {
    const { id, checked } = e.target;
    setisToggle((prevState) =>
      prevState.map((item) =>
        item.id === id ? { ...item, checked } : item
      )
    );
    sendMessage(e.target);
  };

  const sendMessage = (values) =>{
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
      console.log(tabs[0].url);
    });
  }

  return (
    <div className="p-3 flex flex-col gap-3 w-full ">
      <nav className='flex flex-row justify-between'>
        <Title />
        <div className='flex flex-row gap-2'>
          <Button>
            <PowerIcon size={20} />
          </Button>
        </div>
      </nav>
      <div>
        <div className='flex flex-row gap-3 items-center'>
          <Input onChange={handleToggle} isToggle={isToggle} id='yt-tm-home-feed' />
          <Heading>Hide Home Feed</Heading>
        </div>
        <div className='flex flex-row gap-3 items-center'>
          <Input onChange={handleToggle} isToggle={isToggle} id='yt-tm-search-bar' />
          <Heading>Hide Search Bar</Heading>
        </div>
      </div>
    </div>
  )
}

export default App
