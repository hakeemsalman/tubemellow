chrome.runtime.onInstalled.addListener(() => {
  console.log('You have run the chrome extension')
})

chrome.bookmarks.onCreated.addListener(() => {
  console.log('You have just bookmarked the page.')
})