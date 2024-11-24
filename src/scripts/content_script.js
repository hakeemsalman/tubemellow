chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === "modifyClass") {
    console.log("Received toggle state in content script:", request.toggle);
    let divId = await document.querySelectorAll(request.toggle.htmlId)
    console.log("query selector divId:", divId);
    request.toggle.checked ? divId.forEach(e => e.classList.add('hidden')) : divId.forEach(e => e.classList.remove('hidden'));
  }
  sendResponse({ success: true, toggleState: request.toggle });
  return true; // Keep listener alive for async response
});
