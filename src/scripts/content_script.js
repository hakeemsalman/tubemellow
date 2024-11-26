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
                    element.classList.add('hidden');
                } else {
                    element.classList.remove('hidden');
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
          if (item.toggle && item.toggle.checked) {
            element.classList.add('hidden');
          } else {
            element.classList.remove('hidden');
          }
        });
      }
    });
  }
  
  // Main function to handle DOM modifications
  function initializeScript() {
    console.log("DOM fully loaded, running YouTube modifier script");
  
    const dataString = localStorage.getItem('tm--yt-storage-data');
    console.log('Data from localStorage:', dataString);
  
    if (!dataString) {
      console.log('No data found in localStorage');
      return;
    }
  
    try {
      const data = JSON.parse(dataString);
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
  