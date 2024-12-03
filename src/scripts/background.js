chrome.tabs.onActivated.addListener(() => {
  checkActiveTab();
});

chrome.tabs.onUpdated.addListener((tabId, info) => {
  checkActiveTab(tabId);
  checkPageLoad(tabId, info);
});

function checkActiveTab(tabId) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length === 0) return;

    try {
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
function checkPageLoad(tabId, info) {
  console.log('inside check page load')
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length === 0) return;
    try {
      if (info.status === 'complete' && tabId === tabs[0].id && tabs[0].url === "https://www.youtube.com/") {
        console.log('inside info', info)
        console.log('inside info', tabs[0])
        chrome.tabs.sendMessage(tabs[0].id,{ action: 'updateDom'});
      }
    } catch (error){
      console.error("Error checking active tab:", error);
    }
  });
}
