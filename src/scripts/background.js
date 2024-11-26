chrome.tabs.onActivated.addListener(() => {
  checkActiveTab();
});

chrome.tabs.onUpdated.addListener(() => {
    checkActiveTab();
});



function checkActiveTab() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length === 0) return;

    try {
      console.log("Active tab details:", tabs[0]); // Debug the active tab's properties
      const activeTab = tabs[0];
      const url = activeTab.url || "";

      if (url && url.includes("youtube.com")) {
        chrome.action.setIcon({ path: chrome.runtime.getURL("assets/icon-16.png") });
        chrome.action.enable();
      } else {
        chrome.action.setIcon({ path: chrome.runtime.getURL("assets/icon-16-disabled.png") });
        chrome.action.disable();
      }
    } catch (error) {
      console.error("Error checking active tab:", error);
    }
  });
}
