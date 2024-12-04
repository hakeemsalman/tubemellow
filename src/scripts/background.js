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
const TM_LANG_KEY = 'tm--yt-lang-key'
const TM_STORAGE_KEY = 'tm--yt-storage-data'
const e = chrome, t = chrome.tabs, a = chrome.action, cn = console;
t.onActivated.addListener(() => {
  c();
});
t.onUpdated.addListener((_,i) => {
  c();
  return new Promise( async (resolve, reject) => { 
    await l(i);
   });
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
function l(i) {
  cn.log('inside check page load')
  t.query({ active: true, currentWindow: true }, (T) => {
    if (T.length === 0) return;
    try {
      console.log('info',i)
      if (i?.status === 'complete' && T[0]?.url?.includes('youtube.com')) {
        console.log('now sending message')
        chrome.tabs.sendMessage(
          T[0].id,
          { action: 'updateDom', toggle: 'updatedDom' },
          (response) => {
            if (chrome.runtime.lastError) {
              console.error('Error in sendMessage method:', chrome.runtime.lastError);
            } else {
              console.log('Response from content script:', response);
            }
          }
        );
      }
    } catch (er) {
      cn.error("Error checking active tab:", er);
    }
  });
}
e.runtime.onInstalled.addListener(() => {
  e.storage.local.set({ [TM_STORAGE_KEY]: initialData.options }, (result) => {
    if (e.runtime.lastError) {
      console.error('runtime error in background script while saving the data', e.runtime.lastError);
    } else {
      console.log('result on installed set key', result)
    }
  });
  e.storage.local.set({ [TM_LANG_KEY]: initialData.lang }, (result) => {
    if (e.runtime.lastError) {
      console.error('runtime error in background script while saving the data', e.runtime.lastError);
    } else {
      console.log('result on installaed set lang', result);
    }
  });
})
