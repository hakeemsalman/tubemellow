import { useState, useEffect } from 'react';
import './App.css';
import Input from './components/Input';
import { initialData } from './static/constants.tsx';
import Heading from './components/Heading.js';
import Title from './components/Title.js';
import { Item } from './utils/types.tsx';
import { LanguageSelector } from './components/LanguageSelector.tsx';
import { TM_STORAGE_KEY } from './static/constants.tsx';
import { useTranslation } from 'react-i18next';

function App() {

  const [isToggle, setisToggle] = useState<Item[]>(initialData); // map storage data
  const [t] = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      chrome.storage.local.get(TM_STORAGE_KEY, async (result) => {
        console.log('TM_STORAGE_KEY:', result[TM_STORAGE_KEY])
        if (result[TM_STORAGE_KEY]) {
          console.log("Retrieved toggle state:", result[TM_STORAGE_KEY]);
          setisToggle(result[TM_STORAGE_KEY]);
        } else {
          console.log("No toggle state found, applying default.");
          // chrome.storage.local.get(null, (result) => console.log(result)); //This will log all key-value pairs stored in `chrome.storage.local`.
        }
      });
    };

    fetchData();
  }, []);

  // Handle toggle changes
  const handleToggle = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
    chrome.storage.local.set({ [TM_STORAGE_KEY]: updatedToggle }, () => {
      if (chrome.runtime.lastError) {
        console.error("Error updating storage:", chrome.runtime.lastError.message);
      } else {
        console.log("Storage updated successfully");
      }
    });

    // Find the single updated toggle item
    const singleToggleButton = updatedToggle.find((item) => item.id === id);
    if (singleToggleButton) {
      try {
        const result = await sendMessage(singleToggleButton); // Await the promise returned by sendMessage
        if (result) {
          console.log('Message sent successfully');
        } else {
          console.log('Message no youtube failed');
        }
      } catch (error) {
        console.log('Error in sendMessage in No youtube found:', error);
      }
    }

  };



  // Send message to the Chrome content script
  const sendMessage = (values: Item): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id && tabs[0].url?.includes('youtube.com')) {
          chrome.tabs.sendMessage(
            tabs[0].id,
            { action: 'modifyClass', toggle: values },
            (response) => {
              if (chrome.runtime.lastError) {
                console.error('Error in sendMessage method:', chrome.runtime.lastError);
                reject(false); // Reject the promise on error
              } else {
                console.log('Response from content script:', response);
                resolve(true); // Resolve the promise on success
              }
            }
          );
        } else {
          console.error('No active YouTube tab found');
          reject(false); // Reject the promise if no valid tab is found
        }
      });
    });
  };


  return (
    <div className="p-3 flex flex-col gap-3 w-full">
      <nav className="flex flex-row justify-between border-blue-400 border-b-2 pb-2">
        <Title />
        <div className="flex flex-row gap-2">
          <LanguageSelector/>
        </div>
      </nav>
      <div>
        {isToggle.map((item: Item) => (
          <div className="flex flex-row gap-3 items-center" key={item.id}>
            <Input
              onChange={handleToggle}
              id={item.id}
              isChecked={item.checked}
              name={item.htmlId}
            />
            <Heading>{t(`yt.${item.title}`)}</Heading>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
