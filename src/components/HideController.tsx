import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Item } from "../utils/types";
import { initialData, TM_STORAGE_KEY } from "../static/constants";
import Toggle from "./Toggle";
import Heading from "./Heading";
import Tooltip from "./Tooltip";

export default function HideController() {
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

  const handleToggle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
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
    <div>
      {isToggle.map((item: Item, index: number) => (
        <div className={`flex flex-row gap-3 items-center`} key={item.id}>
          <Tooltip tooltip={item.checked ? 'ON' : 'OFF'}>
          <Toggle
            onChange={handleToggle}
            id={item.id}
            isChecked={item.checked}
            name={item.htmlId}
            />
            </Tooltip>
          <Heading>{t(`yt.${item.title}`)}</Heading>
        </div>
      ))}
    </div>
  )
}
