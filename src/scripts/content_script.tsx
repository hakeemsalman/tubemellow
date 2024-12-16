import { TM_STORAGE_KEY } from "../static/constants";
import { getFromStorage } from "../utils/storageManager";
import { Item } from "../utils/types";

chrome.runtime.onMessage.addListener(async (request: any, _ ,sendResponse: (response: any) => void) => {
  console.log("Message received in content script:", request);
  switch (request.action) {
    case 'updateDom':
      await initializeScript();
      sendResponse({ success: true, status: false });
      break;
    case 'modifyDom':
      await modifyDOM([request.toggle]);
      sendResponse({ success: true , status: false});
      break;
    default:
      sendResponse({ success: false , status: false});
      break;
  }
  return false;
});

async function modifyDOM(data: Item[]) {
  data.forEach((item) => {
    const elements = document.querySelectorAll(item.htmlId);
    elements.forEach((element) => {
      item.checked ? element.setAttribute("hidden", "true") : element.removeAttribute("hidden");
      if (item.id === "tm--yt-search-bar") {
        const pageManager  = document.querySelector("#page-manager") as HTMLElement;;
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
  const result = await getFromStorage(TM_STORAGE_KEY);
  const options = result || [];
  if (options.length > 0) {
    modifyDOM(options);
    const observer = new MutationObserver(() => {
      if (document.querySelector("#primary ytd-rich-grid-renderer") || document.querySelector("#primary ytd-item-section-renderer")) {
        modifyDOM(options);
        observer.disconnect(); // Stop observing once the desired content is detected
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  } else {
    console.log("No data found in local storage.");
  }
}
