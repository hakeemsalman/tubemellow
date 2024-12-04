const initialData = {
  options: [
    {
      "id": "tm--yt-home-feed",
      "title": "homeFeed",
      "htmlId": "#primary ytd-rich-grid-renderer",
      "checked": false
    },
    {
      "id": "tm--yt-search-bar",
      "title": "searchBar",
      "htmlId": "#masthead-container #masthead",
      "checked": false
    },
    {
      "id": "tm--yt-video-info",
      "title": "videoInfo",
      "htmlId": "#above-the-fold",
      "checked": false
    },
    {
      "id": "tm--yt-title",
      "title": "videoTitle",
      "htmlId": ".ytp-title .ytp-title-text",
      "checked": false
    },
    {
      "id": "tm--yt-comments",
      "title": "comments",
      "htmlId": "#comments",
      "checked": false
    },
    {
      "id": "tm--yt-recommandations",
      "title": "recommandation",
      "htmlId": "#columns #secondary",
      "checked": false
    },
    {
      "id": "tm--yt-shorts",
      "title": "shorts",
      "htmlId": "ytd-rich-section-renderer ytd-rich-shelf-renderer[is-shorts]",
      "checked": false
    },
  ],
  lang:
    { 
      name: 'English', 
      key: 'en', 
      flagKey: 'gb' 
    }
}
const injectedTabs = new Set(); // Track tabs where content script is injected
const TM_LANG_KEY = 'tm--yt-lang-key'
const TM_STORAGE_KEY = 'tm--yt-storage-data'
const e = chrome, t = chrome.tabs, a = chrome.action, cn = console;
t.onActivated.addListener(() => {
  c();
});
t.onUpdated.addListener((T, i, b) => {
  c();
  if (i.status === "complete" && b.url?.includes("youtube.com") && !injectedTabs.has(T)) {
    cn.log("Tab updated, injecting content script and sending message");
    chrome.scripting.executeScript(
      { target: { tabId: T }, files: ["content_script.js"] },
      () => {
        setTimeout(() => {
          chrome.tabs.sendMessage(
            T,
            { action: "updateDom" },
            (response) => {
              if (chrome.runtime.lastError) {
                console.error("Error sending message:", chrome.runtime.lastError.message);
              } else {
                console.log("Response from content script:", response);
              }
            }
          );
        }, 500); // Adjust delay if necessary
      }
    );
  }
});
function g(p) {
  return e.runtime.getURL(p);
}
function c() {
  t.query({ active: true, currentWindow: true }, (t) => {
    if (t.length === 0) return;
    try {
      const u = t[0]?.url || "";
      if (u && u.includes("youtube.com")) {
        a.setIcon({ path: g("assets/icon-16.png") });
        a.enable();
      } else {
        a.setIcon({ path: g("assets/icon-16-disabled.png") });
        a.disable();
      }
    } catch (er) {
      cn.error("Error checking active tab:", er);
    }
  });
}

e.runtime.onInstalled.addListener(() => {
  e.runtime.onInstalled.addListener(() => {
    // Initialize storage with default data only if not already set
    chrome.storage.local.get([TM_STORAGE_KEY, TM_LANG_KEY], (storedData) => {
      if (!storedData[TM_STORAGE_KEY]) {
        chrome.storage.local.set({ [TM_STORAGE_KEY]: initialData.options });
      }
      if (!storedData[TM_LANG_KEY]) {
        chrome.storage.local.set({ [TM_LANG_KEY]: initialData.lang });
      }
    });
  });
})
