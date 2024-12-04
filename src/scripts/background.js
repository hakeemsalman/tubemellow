(() => {
   const initialData = {
    options:
      [
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
      lang: 'en'
  }
  const TM_LANG_KEY = 'tm--yt-lang-key'
  const TM_STORAGE_KEY = 'tm--yt-storage-data'
  const e = chrome, t = chrome.tabs, a = chrome.action, cn = console;
  t.onActivated.addListener(() => {
    c();
  });
  t.onUpdated.addListener((i) => {
    c();
    l(i);
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
        if (i.status === 'complete' && T[0].url === "https://www.youtube.com/") {
          t.sendMessage(T[0].id, { action: 'updateDom' });
        }
      } catch (er) {
        cn.error("Error checking active tab:", er);
      }
    });
  }
  e.runtime.onInstalled.addListener(async () => {
    e.storage.local.set({ [TM_STORAGE_KEY]: initialData.options }, (result) => {
      if (e.runtime.lastError) {
        console.error('runtime error in background script while saving the data', e.runtime.lastError);
      } else {
        console.log('result on installed set key', result)
      }
    });
    e.storage.local.set({ [TM_LANG_KEY]: 'en' }, (result) => {
      if (e.runtime.lastError) {
        console.error('runtime error in background script while saving the data', e.runtime.lastError);
      } else {
        console.log('result on installaed set lang', result);
      }
    });
  })
})();
