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
import { LANGUAGES } from '../../static/constants'
// When you add a new language, add it to scripts/localize.ts as well.
// https://www.w3schools.com/tags/ref_language_codes.asp

const DEFAULT_LANGUAGE = 'en'

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

export {i18n, LANGUAGES, DEFAULT_LANGUAGE}