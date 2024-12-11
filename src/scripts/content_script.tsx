import { createRoot } from "react-dom/client";
import Notes from "../components/Notes";
import { Item } from "../utils/types";

let root: ReturnType<typeof createRoot> | null = null;
if (!window.contentScriptInitialized) {
  window.contentScriptInitialized = true;

  chrome.runtime.onMessage.addListener(async (request, _, sendResponse) => {
    console.log("Message received in content script:", request);
    try {
      switch (request.action) {
        case "updateDom":
          await initializeScript();
          sendResponse({ success: true, domStatus: "updated" });
          break;
        case "modifyClass":
          await modifyDOM([request.toggle]);
          sendResponse({ success: true });
          break;
        case "addNotesDOM":
          console.log("notesDOM content script", request.toggle);
          await addNoteDiv(request.toggle);
          sendResponse({ success: true });
          break;
        default:
          sendResponse({ success: false });
          break;
      }
    } catch (error: unknown) {
      if (typeof error === "string") {
        error.toUpperCase() // works, `e` narrowed to string
      } else if (error instanceof Error) {
        sendResponse({ success: false, error: error.message });
      }
    }
  });
}

async function addNoteDiv(open: boolean) {
  if (open) {
    if (!root) {
      const container = document.createElement("div");
      container.id = "notes-react-container";
      document.body.appendChild(container);

      root = createRoot(container);
      root.render(<Notes />);
    }
  } else {
    if (root) {
      root.unmount();
      root = null;

      const container = document.getElementById("notes-react-container");
      if (container) {
        document.body.removeChild(container);
      }
    }
  }
}
async function modifyDOM(data: Item[]) {
  data.forEach((item: Item) => {
    const elements = document.querySelectorAll(item.htmlId);
    elements.forEach((element) => {
      item.checked ? element.setAttribute("hidden", 'true') : element.removeAttribute("hidden");
      if (item.id === "tm--yt-search-bar") {
        const pageManager = document.querySelector("#page-manager");
        const guide = document.querySelector("#guide #guide-spacer");
        const chips = document.querySelector("#chips-wrapper");
        if (pageManager) {
          
          item.checked ? (pageManager.setAttribute('style', 'margin-top: 0px')) : pageManager.removeAttribute('style');
        }
        if (guide) {
          item.checked ? (guide.setAttribute('style', 'margin-top: 0px')) : guide.removeAttribute("style");
        }
        if (chips) {
          item.checked ? (chips.setAttribute('style', 'top: 0px')) : chips.removeAttribute("style");
        }
      }
    });
  });
}
async function initializeScript() {
  const K = 'tm--yt-storage-data';
  const result = await chrome.storage.local.get(K);
  const options = result[K] || [];
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
