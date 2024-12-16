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

## noembed json data
```json
{
    "thumbnail_height": 360,
    "version": "1.0",
    "url": "https://www.youtube.com/watch?v=ICcOOBsjVGE",
    "width": 200,
    "thumbnail_width": 480,
    "provider_name": "YouTube",
    "type": "video",
    "height": 113,
    "provider_url": "https://www.youtube.com/",
    "html": "<iframe width=\"200\" height=\"113\" src=\"https://www.youtube.com/embed/ICcOOBsjVGE?feature=oembed\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen title=\"Omar Ibn Al Khattab (ra): His Leadership, His Legacy, His Death | The Firsts - Dr. Omar Suleiman\"></iframe>",
    "author_name": "Yaqeen Institute",
    "author_url": "https://www.youtube.com/@yaqeeninstituteofficial",
    "thumbnail_url": "https://i.ytimg.com/vi/ICcOOBsjVGE/hqdefault.jpg",
    "title": "Omar Ibn Al Khattab (ra): His Leadership, His Legacy, His Death | The Firsts - Dr. Omar Suleiman"
}
```