import { Language } from "../utils/types";

export const LANGUAGES: Language[] = [
  { name: 'English', key: 'en', flagKey: 'gb' },     // english
  { name: 'Deutsch', key: 'de', flagKey: 'de' },     // german
  { name: 'Español', key: 'es', flagKey: 'es' },     // spanish
  { name: 'Français', key: 'fr', flagKey: 'fr' },    // french
  { name: 'हिन्दी', key: 'hi', flagKey: 'in' },         // hindi
  { name: 'عربية', key: 'sa', flagKey: 'sa' },         // Arabic
  { name: 'أردو', key: 'ur', flagKey: 'pk' },         // Urdu
  { name: 'Italiano', key: 'it', flagKey: 'it' },    // italian
  { name: '日本語', key: 'ja', flagKey: 'jp' },       // japanese
  { name: 'Українська', key: 'uk', flagKey: 'ua' },  // ukrainian
  { name: '简体中文', key: 'zh', flagKey: 'cn' },     // simplified chinese
]

export const LANGUAGE_SELECTOR_ID = 'language-selector';
export const TM_LANG_KEY = 'tm--yt-lang-key'
export const TM_STORAGE_KEY = 'tm--yt-storage-data'

export const initialData = [
  {
    "id": "tm--yt-home-feed",
    "title": "homeFeed",
    "htmlId": "#primary ytd-rich-grid-renderer",
    "checked": false
  },
  {
    "id": "tm--yt-search-bar",
    "title": "searchBar",
    "htmlId": "#masthead-container #masthead",
    "checked": false
  },
  {
    "id": "tm--yt-video-info",
    "title": "videoInfo",
    "htmlId": "#above-the-fold",
    "checked": false
  },
  {
    "id": "tm--yt-title",
    "title": "videoTitle",
    "htmlId": ".ytp-title .ytp-title-text",
    "checked": false
  },
  {
    "id": "tm--yt-comments",
    "title": "comments",
    "htmlId": "#comments",
    "checked": false
  },
  {
    "id": "tm--yt-recommandations",
    "title": "recommandation",
    "htmlId": "#columns #secondary",
    "checked": false
  },
  {
    "id": "tm--yt-shorts",
    "title": "shorts",
    "htmlId": "ytd-rich-section-renderer ytd-rich-shelf-renderer[is-shorts]",
    "checked": false
  },
]