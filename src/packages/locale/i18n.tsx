// Copyright LocalChat 2024, all rights reserved.

'use client'

import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import de from './de.json'
import en from './en.json'
import es from './es.json'
import fr from './fr.json'
import hi from './hi.json'
import it from './it.json'
import ja from './ja.json'
import zh from './zh.json'
import uk from './uk.json'
import sa from './sa.json'
import ur from './ur.json'
import {TM_LANG_KEY } from '../../static/constants'
// When you add a new language, add it to scripts/localize.ts as well.
// https://www.w3schools.com/tags/ref_language_codes.asp

let DEFAULT_LANGUAGE = 'en';

(()=>{
  chrome.storage.local.get(TM_LANG_KEY, async (result) => {
    console.log('TM_LANG_KEY:', result[TM_LANG_KEY])
    if (result[TM_LANG_KEY]) {
      console.log("Retrieved lang state:", result[TM_LANG_KEY]);
      DEFAULT_LANGUAGE = result[TM_LANG_KEY].key;
    } else {
      console.log("No lang state found, applying default.");
      // chrome.storage.local.get(null, (result) => console.log(result)); //This will log all key-value pairs stored in `chrome.storage.local`.
    }
  });
})


i18n.use(initReactI18next).init({
  lng: DEFAULT_LANGUAGE, // Default language
  fallbackLng: DEFAULT_LANGUAGE, // Fallback language
  resources: {
    en: {
      translation: en
    },
    fr: {
      translation: fr
    },
    es: {
      translation: es
    },
    it: {
      translation: it
    },
    de: {
      translation: de
    },
    ja: {
      translation: ja
    },
    zh: {
      translation: zh
    },
    hi: {
      translation: hi
    },
    uk: {
      translation: uk
    },
    sa: {
      translation: sa
    },
    ur: {
      translation: ur
    }
  }
})

export {i18n}