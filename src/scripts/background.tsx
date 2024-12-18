const ID = {
  o: [
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
      "id": "tm--yt-video-controllers",
      "title": "videoController",
      "htmlId": ".ytp-chrome-bottom",
      "checked": false
    },
    {
      "id": "tm--yt-comments",
      "title": "comments",
      "htmlId": "#comments",
      "checked": false
    },
    {
      "id": "tm--yt-chapters",
      "title": "chapters",
      "htmlId": "#secondary #panels",
      "checked": false
    },
    {
      "id": "tm--yt-recommandations",
      "title": "recommandation",
      "htmlId": "#secondary #related.style-scope.ytd-watch-flexy",
      "checked": false
    },
    {
      "id": "tm--yt-shorts",
      "title": "shorts",
      "htmlId": "ytd-rich-section-renderer ytd-rich-shelf-renderer[is-shorts], ytd-reel-shelf-renderer",
      "checked": false
    },
  ],
  l:
    { 
      name: 'English', 
      key: 'en', 
      flagKey: 'gb' 
    }
}

const TL = 'tm--yt-lang-key'
const TS = 'tm--yt-storage-data'

const injectedTabs = new Set(); // Track tabs where content script is injected
const e = chrome, t = chrome.tabs, a = chrome.action, cn = console;
t.onActivated.addListener(() => {
  c();
});
t.onUpdated.addListener((T, i, b) => {
  c();
  if (i.status === "complete" && b.url?.includes("youtube.com") && !injectedTabs.has(T)) {
    chrome.scripting.executeScript(
      { target: { tabId: T }, files: ["content_script.js"] },
      () => {
        setTimeout(() => {
            chrome.tabs.sendMessage(
              T,
              { action: "updateDom" },);
        }, 300);
      }
    );
  }
});
function g(p: string) {
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
  e.storage.local.set({[TL]: ID.l});
  e.storage.local.set({[TS]: ID.o});
})


e.runtime.setUninstallURL('https://chromewebstore.google.com/detail/tube-mellow/fgflinjcolmfjdkilakkcgennlkhgkgh')

