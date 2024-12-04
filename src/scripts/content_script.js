chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  console.log("Message received in content script:", request);
  if (request.action === "updateDom") {
    console.log("updateDom action triggered");
    await initializeScript();
    sendResponse({ success: true, domStatus: "updated" });
  } else if (request.action === "modifyClass") {
    await modifyDOM([request.toggle]);
    sendResponse({ success: true });
  } else {
    sendResponse({ success: false });
  }
});
// Function to modify the DOM
async function modifyDOM(data) {
  data.forEach((item) => {
    if (item.checked) {
      console.log('inside modify dom data for each')
      const elements = document.querySelectorAll(item.htmlId);
      elements.forEach((element) => {
        if (item.checked) {
          element.setAttribute("hidden", true);
        } else {
          element.removeAttribute("hidden");
        }

        if (item.id === "tm--yt-search-bar") {
          const pageManager = document.querySelector("#page-manager");
          if (pageManager) {
            item.checked
              ? (pageManager.style.marginTop = "0px")
              : pageManager.style.removeProperty("margin-top");
          }
        }
      });
    }
  });
}
// Main function to handle DOM modifications
async function initializeScript() {
  const K = 'tm--yt-storage-data';
  console.log("Initializing script...");
  const result = await chrome.storage.local.get(K);
  const options = result[K] || [];

  if (options.length > 0) {
    modifyDOM(options);

    // Set up MutationObserver for dynamic content
    const observer = new MutationObserver(() => {
      if (document.querySelector("#primary ytd-rich-grid-renderer") || document.querySelector("#primary ytd-item-section-renderer")) {
        console.log("Dynamic content detected, modifying DOM");
        modifyDOM(options);
        observer.disconnect(); // Stop observing once the desired content is detected
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  } else {
    console.error("No data found in local storage.");
  }
}
