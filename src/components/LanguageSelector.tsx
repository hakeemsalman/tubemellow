'use client'

import { useEffect, useState} from 'react'
import { LANGUAGE_SELECTOR_ID, LANGUAGES, TM_LANG_KEY } from '../static/constants'
import {useTranslation} from 'react-i18next'
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { Language } from '../utils/types'
import Button from './Button'
import { CheckCircle2} from 'lucide-react'


interface FlagIconProps {
  className?: string
  countryCode: string;
}

function FlagIcon({className, countryCode}: FlagIconProps) {
  return (
    <span className={`${className} fi fis !w-[20px] !h-[20px] !text-[20px] rounded-full border-none bg-white inline-block fi-${countryCode}`}/>
  )
}

interface Props {
  minimized: boolean,
}

export const LanguageSelector = ({minimized}: Props) => {
  const {i18n} = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(LANGUAGES[0]);

  const handleLanguageChange = async (language: Language) => {
    await i18n.changeLanguage(language.key)
    setIsOpen(false);
    setSelectedLanguage(language);
    chrome.storage.local.set({ [TM_LANG_KEY]: language }, () => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
          }
        })
  }

  useEffect(() => {
    const handleWindowClick = (event: any) => {
      if (event.composedPath().some((element: any) => element.id === LANGUAGE_SELECTOR_ID)) {
        // If we clicked inside the button, return.
        return
      }
      // Else we clicked outside the button, close the dropdown.
      setIsOpen(false)
    }
    chrome.storage.local.get(TM_LANG_KEY, async (result) => {
      console.log('TM_LANG_KEY:', result[TM_LANG_KEY])
      if (result[TM_LANG_KEY]) {
        console.log("Retrieved lang state:", result[TM_LANG_KEY]);
        setSelectedLanguage(result[TM_LANG_KEY]);
      } else {
        console.log("No lang state found, applying default.");
      }
    });
    window.addEventListener('click', handleWindowClick)
    return () => {
      window.removeEventListener('click', handleWindowClick)
    }
  }, [])

  if (!selectedLanguage) {
    return null
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-2 flex flex-row justify-start mt-2 hover:bg-muted/50 hover:no-underline text-base ${minimized ? 'justify-center' : 'justify-start'} `}
        id={LANGUAGE_SELECTOR_ID}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <FlagIcon countryCode={selectedLanguage.flagKey} className={`${minimized ? '' : 'mr-2'}`}/>
      </Button>
      {isOpen && <div
        className="bg-white border border-white origin-top-right absolute right-2 top-14 w-40 rounded-md ring-1 ring-black ring-opacity-5"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="language-selector"
      >
        <div className="p-1" role="none">
          {LANGUAGES.map((language) => (
            <button
              key={language.key}
              onClick={() => handleLanguageChange(language)}
              className="rounded-md hover:bg-muted/50 px-2 py-2 text-sm text-left items-center inline-flex w-full"
              role="menuitem"
            >
              {selectedLanguage.key === language.key ? <CheckCircle2 size={16} className="mr-2"/> : <div className="w-4 mr-2"/>}
              <FlagIcon countryCode={language.flagKey} className="mr-2"/>
              <span className="truncate">{language.name}</span>
            </button>
          ))}
        </div>
      </div>}
      </>
  )
}
