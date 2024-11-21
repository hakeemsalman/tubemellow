chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === "modifyClass") {
    console.log("Received toggle state in content script:", request.toggle);
    let divId = await document.querySelector(`#${request.toggle[0].id}`)
    request.toggle[0].checked ? divId.classList.add('hidden') : divId.classList.remove('hidden');
  }
  // Respond with success and the toggle state
  sendResponse({ success: true, toggleState: request.toggle });
  return true; // Keep listener alive for async response
});
