const TM_STORAGE_KEY = 'tm--yt-storage-data'
let storageData = [];
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  console.log('inside content script')
  if (request.action === 'modifyClass') {
    console.log("Received toggle state in content script:", request.toggle);

    // Perform the action on the DOM
    const elements = document.querySelectorAll(request.toggle.htmlId);
    console.log("Queried elements:", elements);

    if (elements.length > 0) {
      elements.forEach((element) => {
        if (request.toggle.checked) {
          element.setAttribute('hidden', true);
          if(request.toggle.id === 'tm--yt-search-bar'){
            let pageManager = document.querySelector('#page-manager');
            pageManager.style.marginTop = '0px';
          }
        } else {
          element.removeAttribute('hidden');
        }
      });

      sendResponse({ success: true, toggleState: request.toggle });
    } else {
      sendResponse({ success: false, error: "No elements matched the selector." });
    }
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
        if (request.toggle.checked) {
          element.setAttribute('hidden', 'hidden');
        } else {
          element.removeAttribute('hidden');
        }
      });
    }
  });
}

// Main function to handle DOM modifications
async function initializeScript() {
  console.log("DOM fully loaded, running YouTube modifier script");
   chrome.storage.local.get(TM_STORAGE_KEY, (result) => {
    console.log("content script Retrieved toggle state:", result.TM_STORAGE_KEY);
    if (result.TM_STORAGE_KEY) {
      storageData.push(result.TM_STORAGE_KEY);
    } else {
      console.log("No toggle state found, applying default.");
    }
  });
  if (!storageData) {
    console.log('No data found in localStorage');
    return;
  }

  try {
    const data = JSON.parse(storageData[0]);
    if (!Array.isArray(data)) {
      console.error('Data is not an array:', data);
      return;
    }

    // Initial modification
    modifyDOM(data);

    // Set up MutationObserver to handle dynamic content
    const observer = new MutationObserver(() => {
      console.log('Detected DOM change, reapplying modifications');
      modifyDOM(data);
    });

    observer.observe(document.body, { childList: true, subtree: true });
  } catch (error) {
    console.error('Error initializing script:', error);
  }
}

// Wait for DOMContentLoaded
document.addEventListener("DOMContentLoaded", initializeScript);
