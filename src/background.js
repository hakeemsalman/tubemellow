chrome.tabs.onActivated.addListener(() => {
  checkActiveTab();
});

chrome.tabs.onUpdated.addListener(() => {
  checkActiveTab();
});


function checkActiveTab() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length === 0) return;

    const activeTab = tabs[0];
    const url = activeTab.url;

    if (url && url.includes("youtube.com")) {
      chrome.action.setIcon({ path: chrome.runtime.getURL("assets/icon-16.png") });
      chrome.action.enable();
    } else {
      chrome.action.setIcon({ path: chrome.runtime.getURL("assets/icon-16-disabled.png") });
      chrome.action.disable();
    }
  });
}