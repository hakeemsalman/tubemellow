import { Item } from "./types";

export const sendMessage = (actions: string, values: Item | boolean): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id && tabs[0].url?.includes('youtube.com')) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: actions, toggle: values },
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