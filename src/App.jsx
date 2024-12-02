import { useState, useEffect } from 'react';
import './App.css';
import { PowerIcon } from 'lucide-react';
import Input from './components/Input';
import Title from './components/Title';
import Heading from './components/Heading';
import Button from './components/Button';
import {initialData} from './static/tm--yt-json-data'
function App() {

  const [isToggle, setisToggle] = useState(initialData); // map storage data
  const TM_STORAGE_KEY = 'tm--yt-storage-data'
  useEffect(() => {
    const fetchData = async () => {
      chrome.storage.local.get(TM_STORAGE_KEY, async (result) => {
        console.log('result', result[TM_STORAGE_KEY])
        if (result[TM_STORAGE_KEY]) {
          console.log("Retrieved toggle state:");
          setisToggle(await JSON.parse(result[TM_STORAGE_KEY]));
        } else {
          console.log("No toggle state found, applying default.");
          // chrome.storage.local.get(null, (result) => console.log(result)); //This will log all key-value pairs stored in `chrome.storage.local`.
          chrome.storage.local.set({ [TM_STORAGE_KEY]: JSON.stringify(isToggle) }, () => {
            if (chrome.runtime.lastError) {
              console.error("Error updating storage:", chrome.runtime.lastError.message);
            } else {
              console.log("Storage updated successfully");
            }
          });          
          chrome.storage.local.get(TM_STORAGE_KEY, (e)=>{
            console.log('get data use effect', JSON.stringify(e));
          })

        }
      });
    };

    fetchData();
  }, []);

  // Handle toggle changes
  const handleToggle = async (e) => {
    const { id, checked } = e.target;
    // Ensure `isToggle` is an array
    if (!Array.isArray(isToggle)) {
      console.error("isToggle is not a valid array:", isToggle);
      return;
    }
    const updatedToggle = isToggle.map((item) =>
      item.id === id ? { ...item, checked } : item
    );

    setisToggle(updatedToggle);
    chrome.storage.local.set({ [TM_STORAGE_KEY]: JSON.stringify(updatedToggle) }, () => {
      if (chrome.runtime.lastError) {
        console.error("Error updating storage:", chrome.runtime.lastError.message);
      } else {
        console.log("Storage updated successfully");
      }
    }); 

    // Find the single updated toggle item
    const singleToggleButton = updatedToggle.find((item) => item.id === id);
    if (singleToggleButton) {
      await sendMessage(singleToggleButton); // Wrap in an array as expected
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

        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: 'modifyClass', toggle: values },
          (response) => {
            if (chrome.tabs.lastError) {
              console.error('Error in sendMessage:', chrome.tabs.lastError);
            } else if(chrome.runtime.lastError){
              console.error('error in sendMessage, runtime error:',chrome.runtime.lastError.message);
              
            }else {
              console.log('Response from content script:', response);
            }
          }
        );
      }
    });
  };

 const handleClick = (e) => {
  console.log('first', e.target)
  console.log('first', e)
 }

  return (
    <div className="p-3 flex flex-col gap-3 w-full">
      <nav className="flex flex-row justify-between border-blue-400 border-b-2 pb-2">
        <Title />
        <div className="flex flex-row gap-2">
          <Button onClick={handleClick}>
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
