chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
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
    case 'addBookmark':
      console.log('inside switch addbookmark')
      const result = await handleBookmark(request.toggle);
      sendResponse({ success: true, status: result });
      break;
    default:
      sendResponse({ success: false , status: false});
      break;
  }
  return false;
});

async function handleBookmark(tabs) {
  let obj = {};
  const title = document.querySelector('meta[name="title"]').content
  const image = document.querySelector('meta[property="og:image"]').content
  const channel = document.querySelector('#owner #channel-name>div>div>#text>a.yt-simple-endpoint').textContent
  obj['title'] = title;
  obj['image'] = image;
  obj['channel'] = channel;
  const urlParam = new URLSearchParams(tabs[0].url.split('?')[1])
  obj['id'] = urlParam.get('v');
  obj['checked'] = true;
  obj['url'] = tabs[0].url
  console.log('obj',obj)
  return obj;
}

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
