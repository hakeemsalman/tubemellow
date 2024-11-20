(async () => {
  await chrome.offscreen.createDocument({
    url: 'offscreen.html',
    reasons: ['MATCH_MEDIA'],
    justification: '!',
  }).catch(() => {});
  setDarkTheme(await chrome.runtime.sendMessage('checkDarkTheme'));
  chrome.offscreen.closeDocument();
})();

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg === 'darkThemeChanged') {
    setDarkTheme(msg.data);
  } else {
    setDarkTheme(false)
  }
});

function setDarkTheme(val) {
  chrome.storage.local.set({isDark: val});
  // do something meaningful e.g. change the icon 
}