t.onUpdated.addListener((T, i, b) => {

1. `t` = chrome.tabs
2. `T` = tabId
3. `i` = info
4. `b` = tab

## Tabs data
```json
{
    "active": true,
    "audible": false,
    "autoDiscardable": true,
    "discarded": false,
    "favIconUrl": "https://www.youtube.com/s/desktop/3637873e/img/logos/favicon_32x32.png",
    "groupId": -1,
    "height": 444,
    "highlighted": true,
    "id": 888645885,
    "incognito": false,
    "index": 5,
    "lastAccessed": 1734178473218.786,
    "mutedInfo": {
        "muted": false
    },
    "pinned": false,
    "selected": true,
    "status": "complete",
    "title": "(2) YouTube",
    "url": "https://www.youtube.com/",
    "width": 1920,
    "windowId": 888645556
}
```