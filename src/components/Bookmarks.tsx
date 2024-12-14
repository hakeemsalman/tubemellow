import { useEffect } from "react";
import { BookmarkProps } from "../utils/types";
import BookmarkCard from "./BookmarkCard";

export default function Bookmarks({bookmarkList, onClick}: BookmarkProps) {

  useEffect(() => {
    console.log('bookmarkList', bookmarkList)
  }, [])
  
  return (
    <>
      {bookmarkList.length > 0 && bookmarkList.map(item => (
        <BookmarkCard key={item.id} title={item.title} url={item.url} id={item.id} channel={item.channel} image={item.image} onClick={onClick}/>
      ))}
    </>
  )
}
