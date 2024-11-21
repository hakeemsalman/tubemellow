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
      id: 'sections',
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
    const updatedToggle = isToggle.map((item) =>
      item.id === id ? { ...item, checked } : item
    );
    setisToggle(updatedToggle);
    console.log('updatedToggle', updatedToggle)
    const singleToggleButton = updatedToggle.filter(item => item.id === id);
    console.log("Updated toggle state:", singleToggleButton);
    sendMessage(singleToggleButton);
  };

  const sendMessage = (values) => {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      if (tabs[0]?.id) {
        console.log("Sending message to content script:", { action: "modifyClass", toggle: values });
       let wa = await chrome.tabs.sendMessage(
          tabs[0].id,
          { action: "modifyClass", toggle: values }, // Use passed `values`
          (response) => {
            if (chrome.runtime.lastError) {
              console.error("Error in sendMessage:", chrome.runtime.lastError.message);
            } else {
              console.log("Response from content script:", response);
            }
          }
        );
      }
    });
  };

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
          <Input onChange={handleToggle} isToggle={isToggle} id='sections' />
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
