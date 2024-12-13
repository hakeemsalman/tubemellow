chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  console.log("Message received in content script:", request);
  if (request.action === "updateDom") {
    await initializeScript();
    sendResponse({ success: true, domStatus: "updated" });
  } else if (request.action === "modifyClass") {
    await modifyDOM([request.toggle]);
    sendResponse({ success: true });
  } else if (request.action === 'dark') {
    await darkMode(request.toggle);
    sendResponse({ success: true });
  } else {
    sendResponse({ success: false });
  }
});
async function modifyDOM(data) {
  data.forEach((item) => {
    const elements = document.querySelectorAll(item.htmlId);
    elements.forEach((element) => {
      item.checked ? element.setAttribute("hidden", true) : element.removeAttribute("hidden");
      if (item.id === "tm--yt-search-bar") {
        const pageManager = document.querySelector("#page-manager");
        const guide = document.querySelector("#guide #guide-spacer");
        const chips = document.querySelector("#chips-wrapper");
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

async function darkMode(dark) {
  const styleId = 'youtube-theme-style';
  let styleDiv = document.getElementById(styleId);
  document.getElementById('cinematics').setAttribute('hidden','true');
  if (!styleDiv) {
    styleTag = document.createElement('style');
    styleTag.id = styleId;
    document.head.appendChild(styleTag);
  }
  if (dark) {
    styleTag.textContent = `
           html, body, #content, #container, .ytSearchboxComponentInputBoxDark, ytd-app {
             background-color: #0f0f0f !important;
             color: #ffffff !important;
            }
            a, .yt-simple-endpoint, ytd-watch-metadata, #text, span, #video-title, .paper-input-input, .ytd-compact-link-renderer {
              color: #ffffff !important;
            }
            ytd-button-renderer{
              background-color: #0f0f0f !important;
              color: #ffffff !important;
           }
           .ytSearchboxComponentSearchButton> yt-icon > .yt-icon-shape > div{
            color: #0f0f0f !important;
          }
         `;
  } else {
    styleTag.textContent = `
           html, body, #content, #container, .ytSearchboxComponentInputBoxDark, ytd-app {
             background-color: #ffffff !important;
             color: #0f0f0f !important;
            }
            a, .yt-simple-endpoint, ytd-watch-metadata, #text, span, #video-title, .paper-input-input, .ytd-compact-link-renderer {
              color: #0f0f0f !important;
            }
            ytd-button-renderer{
              background-color: #ffffff !important;
              color: #0f0f0f !important;
           }
           .subscribe-button-shape, .ytSearchboxComponentSearchButton> yt-icon > .yt-icon-shape > div{
            color: #ffffff !important;
          }
         `;
  }
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
