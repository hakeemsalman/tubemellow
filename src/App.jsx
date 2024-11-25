import { useState, useEffect } from 'react';
import './App.css';
import { PowerIcon } from 'lucide-react';
import Input from './components/Input';
import Title from './components/Title';
import Heading from './components/Heading';
import Button from './components/Button';

function App() {
  const ytMapIds = [
    {
      id: "tm--yt-home-feed",
      title: "Hide Home Feed",
      htmlId: "#primary ytd-rich-grid-renderer",
      checked: false
    },
    {
      id: "tm--yt-comments",
      title: "Hide Comments",
      htmlId: "#comments",
      checked: false
    },
    {
      id: "tm--yt-title",
      title: "Hide Video Title",
      htmlId: "#title",
      checked: false
    },
    {
      id: "tm--yt-video-info",
      title: "Hide Video Info",
      htmlId: "#above-the-fold",
      checked: false
    },
    {
      id: "tm--yt-shorts",
      title: "Hide Shorts",
      htmlId: "ytd-rich-section-renderer ytd-rich-shelf-renderer[is-shorts]",
      checked: false
    },
    {
      id: "tm--yt-search-bar",
      title: "Hide Search Bar",
      htmlId: "#masthead-container, #chips-wrapper",
      checked: false
    },
    {
      id: "tm--yt-mix-video",
      title: "Hide Mix",
      htmlId: "ytd-rich-item-renderer #content yt-collections-stack, .yt-lockup-view-model-wiz__metadata",
      checked: false
    }
  ];

  const [isToggle, setisToggle] = useState([]);
  const TM_STORAGE_KEY = 'tm--yt-storage-data'
  
  useEffect(() => {
    const fetchData = async () => {
        let data = localStorage.getItem(TM_STORAGE_KEY)
     if (data) {
        setisToggle(await JSON.parse(data)); // Parse stored JSON string
      } else {
        localStorage.setItem(TM_STORAGE_KEY, await JSON.stringify(ytMapIds));
        setisToggle(ytMapIds);
      } 
    };
  
    fetchData();
  }, []);
  
  // Handle toggle changes
  const handleToggle = async (e) => {
    const {id , checked} = e.target;
    // Ensure `isToggle` is an array
    if (!Array.isArray(isToggle)) {
      console.error("isToggle is not a valid array:", isToggle);
      return;
    }
    const updatedToggle = isToggle.map((item) =>
      item.id === id ? { ...item, checked } : item
    );
  
    setisToggle(updatedToggle);
    await localStorage.setItem(TM_STORAGE_KEY, await JSON.stringify(updatedToggle));
  
    // Find the single updated toggle item
    const singleToggleButton = updatedToggle.find((item) => item.id === id);
    if (singleToggleButton) {
      sendMessage(singleToggleButton); // Wrap in an array as expected
    } else {
      console.error(`Item with id "${id}" not found in isToggle.`);
    }
  };

  

  // Send message to the Chrome content script
  const sendMessage = (values) => {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      if (tabs[0]?.id) {
        console.log('Sending message to content script:', {
          action: 'modifyClass',
          toggle: values,
        });

        await chrome.tabs.sendMessage(
          tabs[0].id,
          { action: 'modifyClass', toggle: values },
          (response) => {
            if (chrome.runtime.lastError) {
              console.error('Error in sendMessage:', chrome.runtime.lastError.message);
            } else {
              console.log('Response from content script:', response);
            }
          }
        );
      }
    });
  };

  return (
    <div className="p-3 flex flex-col gap-3 w-full border-b-2">
      <nav className="flex flex-row justify-between">
        <Title />
        <div className="flex flex-row gap-2">
          <Button>
            <PowerIcon size={20} />
          </Button>
        </div>
      </nav>
      <div>
        {isToggle.map((item) => (
          <div className="flex flex-row gap-3 items-center" key={item.id}>
            <Input
              onChange={handleToggle}
              id={item.id}
              isChecked={item.checked}
              data={item.htmlId}
            />
            <Heading>{item.title}</Heading>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
