import './App.css';
import Title from './components/Title.js';
import { LanguageSelector } from './components/LanguageSelector.tsx';
import HideController from './components/HideController.tsx';
import Footer from './components/Footer.tsx';
import Accordian from './components/Accordian.tsx';
import { useTranslation } from 'react-i18next';
import Bookmarks from './components/Bookmarks.tsx';
import React, { useEffect, useState } from 'react';
import { Bookmark } from './utils/types.tsx';
import { initialData, TM_BOOKMARK_KEY, TM_LANG_KEY, TM_LANGUAGE_DATA, TM_STORAGE_KEY } from './static/constants.tsx';
import BookmarkButton from './components/BookmarkButton.tsx';
import { getFromStorage, saveToStorage } from './utils/factory.tsx';

function App() {
  const [t] = useTranslation();
  const [bookmarkList, setBookmarkList] = useState<Bookmark[] | []>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const result = await getFromStorage(TM_BOOKMARK_KEY);
        const localData = await getFromStorage(TM_STORAGE_KEY);
        if(!localData){
          saveToStorage(TM_STORAGE_KEY, initialData);
          saveToStorage(TM_LANG_KEY,TM_LANGUAGE_DATA);
        }
        console.log('bookmark data',result)
        if (result) {
          setBookmarkList(result);
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
  
    fetchNotes();
  }, []);

  
  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const {id} = event.currentTarget;
    const updatedBookmark = bookmarkList.filter(item => item.id !== id);
    setBookmarkList(updatedBookmark);
    await saveToStorage(TM_BOOKMARK_KEY, updatedBookmark);
  };
  
  return (
    <div className="flex flex-col justify-between h-full w-full rounded-lg">
      <nav className="flex flex-row justify-between py-2 px-3">
        <Title />
        <div className="flex flex-row gap-2">
          <LanguageSelector />
        </div>
      </nav>
      <BookmarkButton bookmarkList={bookmarkList} setBookmarkList={setBookmarkList}/>
      <div className='px-3 py-2 flex flex-col h-full justify-start scrollbar overflow-y-auto'>
        <Accordian title={t('common.yt_title')} id='youtube_content'>
          <HideController />
        </Accordian>
        <Accordian title={t('common.savedBookmark')} id='bookmark'>
          <Bookmarks bookmarkList={bookmarkList} onClick={handleDelete}/>
        </Accordian>
      </div>
      <div className='justify-end'>
        <Footer />
      </div>
    </div>
  );
}

export default App;
