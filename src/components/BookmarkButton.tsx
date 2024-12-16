import { useEffect, useState } from 'react'
import Button from './Button'
import { Bookmark } from '../utils/types';
import { getVideoId } from '../utils/factory';
import { getFromStorage, saveToStorage } from '../utils/storageManager';
import { TM_BOOKMARK_KEY } from '../static/constants';
import { useTranslation } from 'react-i18next';

type Props = {
  bookmarkList: Bookmark[];
  setBookmarkList: (e: Bookmark[]) => void;
}

export default function BookmarkButton({ bookmarkList, setBookmarkList }: Props) {

  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [t] = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getFromStorage(TM_BOOKMARK_KEY);
      console.log('bookmark data', result);
      if (result) {
        await getCurrentBookmark(result)
      }
    }
    fetchData();
  }, [])

  useEffect(()=>{
    getCurrentBookmark(bookmarkList);
  },[bookmarkList])

  const getCurrentBookmark = async (data: Bookmark[]) => {
    const videoId = await getVideoId();
    const value = data.find(item => item.id === videoId)
    if (value) {
      setIsBookmarked(true)
    } else {
      setIsBookmarked(false)
    }
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
        await saveToStorage(TM_BOOKMARK_KEY, updatedBookmarks);
        getCurrentBookmark([result]);
      }
    } catch (error) {
      console.error('Failed to add bookmark:', error);
    }
  }
  const convertJsonData = (data: any): Promise<Bookmark> => {
    return new Promise((resolve) => {
      const urlParam = new URLSearchParams(data.url.split('?')[1])
      const id = urlParam.get('v') || '';
      const obj: Bookmark = {
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
  return (
    <Button id='bookmark-btn' onClick={handleAddBookmark} disable={isBookmarked} className={`${isBookmarked ? 'bg-green-700' : 'bg-primary'} px-3 py-1 text-sm text-white font-semibold`}>{isBookmarked ? t('common.bookmarked') : t('common.addToBookmark')}</Button>
  )
}
