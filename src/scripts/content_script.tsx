import { Item } from "../utils/types";

chrome.runtime.onMessage.addListener(async (request: any, _, sendResponse: (response: any) => void) => {
  console.log("Message received in content script:", request);
  switch (request.action) {
    case 'updateDom':
      await initializeScript();
      sendResponse({ success: true, status: true });
      break;
    case 'modifyDom':
      await modifyDOM([request.toggle]);
      sendResponse({ success: true, status: true });
      break;
    default:
      sendResponse({ success: false, status: false });
      break;
  }
  return false;
});

async function modifyDOM(data: Item[]) {
  data.forEach((item) => {
    console.log('item inside modifyDom', item)
    const elements = document.querySelectorAll(item.htmlId);
    elements.forEach((element) => {
      item.checked ? element.setAttribute("hidden", "true") : element.removeAttribute("hidden");
      if (item.id === "tm--yt-search-bar") {
        const pageManager = document.querySelector("#page-manager") as HTMLElement;;
        const guide = document.querySelector("#guide #guide-spacer") as HTMLElement;;
        const chips = document.querySelector("#chips-wrapper") as HTMLElement;;
        if (pageManager) {
          item.checked ? (pageManager.style.marginTop = "0px") : pageManager.style.removeProperty("margin-top");
        }
        if (guide) {
          item.checked ? (guide.style.marginTop = "0px") : guide.style.removeProperty("margin-top");
        }
        if (chips) {
          item.checked ? (chips.style.top = "0px") : chips.style.removeProperty("top");
        }
      }
    });
  });
}
async function initializeScript() {
  const TM_STORAGE_KEY: string = 'tm--yt-storage-data'
  const data = await chrome.storage.local.get(TM_STORAGE_KEY);
  const options: Item[] = data[TM_STORAGE_KEY];
  if (options && options.length > 0) {
    console.log('options length')
    modifyDOM(options);
    const observer = new MutationObserver(() => {
      console.log('inside observer')
      if (document.querySelector("#primary ytd-rich-grid-renderer") || (document.querySelector("#primary ytd-item-section-renderer") && document.querySelector("#secondary ytd-compact-video-renderer"))) {
        console.log('inside observer if condition')
        modifyDOM(options);
        observer.disconnect(); // Stop observing once the desired content is detected
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  } else {
    console.log("No data found in local storage.");
  }
}
