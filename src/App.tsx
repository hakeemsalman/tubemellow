import './App.css';
import Title from './components/Title.js';
import { LanguageSelector } from './components/LanguageSelector.tsx';
import HideController from './components/HideController.tsx';
import Footer from './components/Footer.tsx';
import Accordian from './components/Accordian.tsx';
import { useTranslation } from 'react-i18next';
import Bookmarks from './components/Bookmarks.tsx';
import Button from './components/Button.tsx';
import React, { useEffect, useState } from 'react';
import { Bookmark } from './utils/types.tsx';
import { getVideoId } from './utils/factory.tsx';
import { TM_BOOKMARK_KEY } from './static/constants.tsx';

function App() {
  const [t] = useTranslation();
  const [bookmarkList, setBookmarkList] = useState<Bookmark[] | []>([]);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  useEffect(() => {
    chrome.storage.local.get([TM_BOOKMARK_KEY], (result) => {
      if (result[TM_BOOKMARK_KEY]) {
        setBookmarkList(result[TM_BOOKMARK_KEY])
        getCurrentBookmark(result[TM_BOOKMARK_KEY]);
      }
    })
  }, [])

  const getCurrentBookmark = async (data: Bookmark[]) => {
    const videoId = await getVideoId();
    const value = data.find(item => item.id === videoId)
    if (value) {
      setIsBookmarked(true)
    } else {
      setIsBookmarked(false)
    }
  }

  const convertJsonData = (data: any): Promise<Bookmark>=>{
    return new Promise((resolve )=>{
      const urlParam = new URLSearchParams(data.url.split('?')[1])
      const id = urlParam.get('v') || '';
      const obj:Bookmark = {
        channel: data.author_name,
        image: data.thumbnail_url,
        title: data.title,
        url: data.url,
        id: id,
        checked: true
      };
      resolve(obj);
    })
  }
  const handleAddBookmark = async () => {
    try {
      // const result = await sendMessage('', 'addBookmark');
      const videoId: string = await getVideoId();
      const queryData: any = await fetch(`https://noembed.com/embed?dataType=json&url=https://www.youtube.com/watch?v=${videoId}`).then(res => res.json());
      const result: Bookmark = await convertJsonData(queryData);
      console.log('result', result);
      if (result) {
        let updatedBookmarks: Bookmark[] = [];
        if (bookmarkList.length === 0) {
          updatedBookmarks = [result];
        } else {
          updatedBookmarks = [...bookmarkList, result];
        }
        console.log('updatedBookmarks', updatedBookmarks)
        setBookmarkList(updatedBookmarks);
        chrome.storage.local.set({ [TM_BOOKMARK_KEY]: updatedBookmarks });
        getCurrentBookmark([result]);
        return updatedBookmarks;
      }
    } catch (error) {
      console.error('Failed to add bookmark:', error);
    }
  }
  
  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {id} = event.currentTarget;
    const updatedBookmark = bookmarkList.filter(item => item.id !== id);
    setBookmarkList(updatedBookmark);
    chrome.storage.local.set({ [TM_BOOKMARK_KEY]: updatedBookmark });
    getCurrentBookmark(updatedBookmark);
  };
  
  return (
    <div className="flex flex-col justify-between h-full w-full rounded-lg">
      <nav className="flex flex-row justify-between py-2 px-3">
        <Title />
        <div className="flex flex-row gap-2">
          <LanguageSelector />
        </div>
      </nav>
      <Button id='bookmark-btn' onClick={handleAddBookmark} disable={isBookmarked} className={`${isBookmarked ? 'bg-green-700' : 'bg-primary'} px-3 py-1 text-sm text-white font-semibold`}>{isBookmarked ? t('common.bookmarked') : t('common.addToBookmark')}</Button>
      <div className='px-3 py-2 flex flex-col h-full justify-start scrollbar overflow-y-auto'>
        <Accordian title={t('common.yt_title')} id='youtube_content'>
          <HideController />
        </Accordian>
        <Accordian title={t('common.savedBookmark')} id='bookmark'>
          <Bookmarks bookmarkList={bookmarkList} onClick={handleDelete} />
        </Accordian>
      </div>
      <div className='justify-end'>
        <Footer />
      </div>
    </div>
  );
}

export default App;
