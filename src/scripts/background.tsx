import { saveToStorage, deleteFromStorage } from "../utils/storageManager.tsx";
import { initialData, TM_BOOKMARK_KEY, TM_LANG_KEY, TM_LANGUAGE_DATA, TM_STORAGE_KEY } from '../static/constants.tsx';
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
    saveToStorage(TM_LANG_KEY, TM_LANGUAGE_DATA);
    saveToStorage(TM_STORAGE_KEY, initialData);
})
e.runtime.setUninstallURL('https://chromewebstore.google.com/detail/tube-mellow/fgflinjcolmfjdkilakkcgennlkhgkgh',() => {
    deleteFromStorage(TM_LANG_KEY);
    deleteFromStorage(TM_STORAGE_KEY);
    deleteFromStorage(TM_BOOKMARK_KEY);
})
