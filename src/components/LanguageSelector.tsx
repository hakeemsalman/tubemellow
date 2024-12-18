'use client'

import { useEffect, useState } from 'react'
import { LANGUAGES, TM_LANG_KEY } from '../static/constants'
import { useTranslation } from 'react-i18next'
import "/node_modules/flag-icons/sass/flag-icons.scss";
import { Language } from '../utils/types'
import Button from './Button'
import { CheckCircle2 } from 'lucide-react'
import Tooltip from './Tooltip';
import { getFromStorage, saveToStorage } from '../utils/factory';


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
    await saveToStorage(TM_LANG_KEY, language);
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await getFromStorage(TM_LANG_KEY)
      console.log('TM_LANG_KEY:', result)
      if (result) {
        console.log("Retrieved lang state:", result);
        setSelectedLanguage(result);
        await i18n.changeLanguage(result.key)
      } else {
        console.log("No lang state found, applying default.");
      }
    }
    fetchData();
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
