'use client'

import { useEffect, useState } from 'react'
import { LANGUAGES, TM_LANG_KEY } from '../static/constants'
import { useTranslation } from 'react-i18next'
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { Language } from '../utils/types'
import Button from './Button'
import { CheckCircle2 } from 'lucide-react'
import Tooltip from './Tooltip';


interface FlagIconProps {
  className?: string
  countryCode: string;
}

function FlagIcon({ className, countryCode }: FlagIconProps) {
  return (
    <span className={`${className} fi fis !w-[20px] !h-[20px] !text-[20px] rounded-full border-none bg-white inline-block fi-${countryCode}`} />
  )
}


export const LanguageSelector = () => {
  const { i18n } = useTranslation()
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
    chrome.storage.local.get(TM_LANG_KEY, async (result) => {
      console.log('TM_LANG_KEY:', result[TM_LANG_KEY])
      if (result[TM_LANG_KEY]) {
        console.log("Retrieved lang state:", result[TM_LANG_KEY]);
        setSelectedLanguage(result[TM_LANG_KEY]);
        await i18n.changeLanguage(result[TM_LANG_KEY].key)
      } else {
        console.log("No lang state found, applying default.");
      }
    });
  }, [i18n])

  return (
    <>
      <Tooltip tooltip='Language' direction='right-9 top-1'>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full px-2 flex flex-row justify-start mt-2 hover:bg-muted/50 hover:no-underline text-base`}
          id="language-selector"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <FlagIcon countryCode={selectedLanguage.flagKey} />
        </Button>
      </Tooltip>
      {isOpen && <div
        className="bg-white border border-white origin-top-right absolute z-10 right-2 top-10 w-40 rounded-md ring-1 ring-black ring-opacity-5"
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
              {selectedLanguage.key === language.key ? <CheckCircle2 size={16} className="mr-2" /> : <div className="w-4 mr-2" />}
              <FlagIcon countryCode={language.flagKey} className="mr-2" />
              <span className="truncate">{language.name}</span>
            </button>
          ))}
        </div>
      </div>}
    </>
  )
}
