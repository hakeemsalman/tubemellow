const K = 'tm--yt-storage-data'
let storageData = [];
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  console.log('inside content script')
  /*
  ** When User toggle the button, dom is updated
  */
  if (request.action === 'modifyClass') {
    // Perform the action on the DOM
    const elements = document.querySelectorAll(request.toggle.htmlId);
    if (elements.length > 0) {
      elements.forEach((element) => {
        if (request.toggle.checked) {
          element.setAttribute('hidden', true);
        } else {
          element.removeAttribute('hidden');
        }
        if (request.toggle.id === 'tm--yt-search-bar') {
          let pageManager = document.querySelector('#page-manager');
          request.toggle.checked ? pageManager.style.marginTop = '0px' : pageManager.style.removeProperty('margin-top');
        }
      });

      sendResponse({ success: true, toggleState: request.toggle });
    } else {
      sendResponse({ success: false, error: "No elements matched the selector." });
    }
  }
  if (request.action === 'updateDom') {
    console.log("update dom listener");
    await initializeScript();
    sendResponse({ success: true, domStatus: 'updated' });
  } else {
    sendResponse({ success: false, domStatus: 'cannot updated' });
  }
  return true; // Keep listener alive for async response
});
// Function to modify the DOM
function modifyDOM(data) {
  console.log('Running modifyDOM with data:', data);
  data.forEach((item) => {
    const elements = document.querySelectorAll(item.htmlId);
    console.log('Queried elements:', elements);
    if (elements.length > 0) {
      elements.forEach((element) => {
        if (item.checked) {
          element.setAttribute('hidden', true);
        } else {
          element.removeAttribute('hidden');
        }
        if (item.id === 'tm--yt-search-bar') {
          let pageManager = document.querySelector('#page-manager');
          item.checked ? pageManager.style.marginTop = '0px' : pageManager.style.removeProperty('margin-top');
        }
      });
    }
  });
}
// Main function to handle DOM modifications
async function initializeScript() {
  console.log('inside initialze script')
  const result = await new Promise((resolve, reject) => {
    chrome.storage.local.get(K, (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result);
      }
    });
  });
  if (!result) {
    console.log('No data found in localStorage');
    return;
  }

  try {
    console.log('result', result[K])
    if (!Array.isArray(result[K])) {
      console.error('Data is not an array:', result[K]);
      return;
    }

    // Initial modification
   

    //Set up MutationObserver to handle dynamic content
    const observer = new MutationObserver(() => {
      if (document.querySelector("#primary ytd-rich-grid-renderer") || document.querySelector("#primary ytd-item-section-renderer")) {
        console.log("YouTube content is fully rendered");
        modifyDOM(result[K]);
        observer.disconnect(); // Stop observing once the desired content is detected
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  } catch (error) {
    console.error('Error initializing script:', error);
  }
}

document.addEventListener("DOMContentLoaded", console.log('loaded'));
