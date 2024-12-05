import {ID} from './constants.js'
const injectedTabs = new Set(); // Track tabs where content script is injected
import { TS } from "./constants.js";
import { TL } from "./constants.js";
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
    chrome.storage.local.get([TS, TL], (storedData) => {
      if (!storedData[TS]) {
        chrome.storage.local.set({ [TS]: ID.o });
      }
      if (!storedData[TL]) {
        chrome.storage.local.set({ [TL]: ID.l });
      }
    });
  });
})
