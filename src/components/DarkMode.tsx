import React, { useEffect, useState } from "react";
import Toggle from "./Toggle";
import { THEME_MODE, TM_DARK_KEY } from "../static/constants";
import { ThemeMode } from "../utils/types";

export default function DarkMode() {
  const [isDark, setIsDark] = useState<ThemeMode>(THEME_MODE);
  useEffect(() => {
    const fetchData = async () => {
      chrome.storage.local.get(TM_DARK_KEY, async (result) => {
        console.log('TM_DARK_KEY:', result[TM_DARK_KEY])
        if (result[TM_DARK_KEY]) {
          console.log("Retrieved toggle state:", result[TM_DARK_KEY]);
          setIsDark(result[TM_DARK_KEY]);
        } else {
          console.log("No toggle state found, applying default.");
          // chrome.storage.local.get(null, (result) => console.log(result)); //This will log all key-value pairs stored in `chrome.storage.local`.
        }
      });
    };

    fetchData();
  }, []);
  
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) =>{
    setIsDark((prev)=> ({...prev, isDark: !prev.isDark}))
    await sendMessage(e.target.checked);
    chrome.storage.local.set({[TM_DARK_KEY]: {...THEME_MODE, isDark: [e.target.checked]}}, ()=>{
      if (chrome.runtime.lastError) {
        console.error("Error updating storage:", chrome.runtime.lastError.message);
      } else {
        console.log("Storage updated successfully");
      }
    });
  }

  const sendMessage = async (values: boolean ): Promise<boolean> => {
      return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs[0]?.id && tabs[0].url?.includes('youtube.com')) {
            chrome.tabs.sendMessage(
              tabs[0].id,
              { action: 'dark', toggle: values },
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
      <Toggle id="dark-button" isChecked={isDark.isDark} name="button" onChange={handleChange}/>
    </div>
  )
}
