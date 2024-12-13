import { Item, Language, ThemeMode } from "../utils/types";

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

/**
 * flags names in https://github.com/lipis/flag-icons/blob/HEAD/sass/_flag-icons-list.scss
 *   @include flag-icon(gb);
  @include flag-icon(de);
  @include flag-icon(es);
  @include flag-icon(fr);
  @include flag-icon(in);
  @include flag-icon(sa);
  @include flag-icon(pk);
  @include flag-icon(it);
  @include flag-icon(jp);
  @include flag-icon(ua);
  @include flag-icon(cn);

 */

export const TM_LANG_KEY: string = 'tm--yt-lang-key'
export const TM_STORAGE_KEY: string = 'tm--yt-storage-data'
export const TM_DARK_KEY: string = 'tm--yt-dark-mode'

export const THEME_MODE: ThemeMode={
  name: 'dark',
  isDark: false
}

export const initialData: Item[] = [
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
    "id": "tm--yt-video-controllers",
    "title": "videoController",
    "htmlId": ".ytp-chrome-bottom",
    "checked": false
  },
  {
    "id": "tm--yt-comments",
    "title": "comments",
    "htmlId": "#comments",
    "checked": false
  },
  {
    "id": "tm--yt-chapters",
    "title": "chapters",
    "htmlId": "#secondary #panels",
    "checked": false
  },
  {
    "id": "tm--yt-recommandations",
    "title": "recommandation",
    "htmlId": "#secondary-inner>#related.style-scope.ytd-watch-flexy",
    "checked": false
  },
  {
    "id": "tm--yt-shorts",
    "title": "shorts",
    "htmlId": "ytd-rich-section-renderer ytd-rich-shelf-renderer[is-shorts], ytd-reel-shelf-renderer",
    "checked": false
  },
]