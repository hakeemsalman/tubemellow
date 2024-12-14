export const getVideoId = async (): Promise<any> => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0].url) {
        const urlParam = new URLSearchParams(tabs[0].url.split('?')[1]);
        resolve(urlParam.get('v'))
      } else {
        reject('error');
      }
    })
  })
}

export const sendMessage = (values: any, actions: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id && tabs[0].url?.includes('youtube.com')) {
        if (actions === 'addBookmark') {
          let rs = sendMessageClient(tabs, actions, tabs);
          if (rs) {
            console.log('after message clietn rs', rs)
            resolve(rs);
          } else {
            reject(rs);
          }
        } else {
          let r = sendMessageClient(tabs, actions, values);
          if (r) {
            resolve(r);
          } else {
            reject(r);
          }
        }
      } else {
        console.error('No active YouTube tab found');
        reject(false); // Reject the promise if no valid tab is found
      }
    });
  });
};

async function sendMessageClient(tabs: any, actions: any, values: any): Promise<any> {
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: actions, toggle: values },
      (response) => {
        if (chrome.runtime.lastError) {
          console.error('Error in sendMessage method:', chrome.runtime.lastError);
          reject(response.status); // Reject the promise on error
        } else {
          console.log('Response from content script:', response);
          resolve(response.status); // Resolve the promise on success
        }
      }
    );
  })
}

