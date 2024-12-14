import './App.css';
import Title from './components/Title.js';
import { LanguageSelector } from './components/LanguageSelector.tsx';
import HideController from './components/HideController.tsx';
import Footer from './components/Footer.tsx';
import Accordian from './components/Accordian.tsx';
import { useTranslation } from 'react-i18next';
import Bookmarks from './components/Bookmarks.tsx';
import Button from './components/Button.tsx';
import { useState } from 'react';
import { Bookmark } from './utils/types.tsx';

function App() {
  const [t] = useTranslation();
  const [bookmarkList , setBookmarkList] = useState<Bookmark[] | null>();

  const handleAddBookmark = () =>{
    
  }
  return (
    <div className="flex flex-col justify-between h-full w-full rounded-lg">
      <nav className="flex flex-row justify-between border-primary border-b-2 py-2 px-3">
        <Title />
        <div className="flex flex-row gap-2">
          <LanguageSelector />
        </div>
      </nav>
      <Button id='bookmark-btn' onClick={handleAddBookmark} className='bg-primary px-3 py-1 text-sm text-white font-semibold'>Add to bookmark</Button>
      <div className='px-3 py-2 flex flex-col h-full justify-start'>
        <Accordian title={t('common.yt_title')} id='youtube_content'>
          <HideController />
        </Accordian>
        <Accordian title={t('common.bookmark')} id='bookmark'>
          <Bookmarks />
        </Accordian>
      </div>
      <div className='justify-end'>
        <Footer />
      </div>
    </div>
  );
}

export default App;
