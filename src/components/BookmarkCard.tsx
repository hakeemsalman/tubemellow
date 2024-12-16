import { Trash2Icon } from "lucide-react";
import Tooltip from "./Tooltip";
import Button from "./Button";
import { BookmarkCardProps } from "../utils/types";

export default function BookmarkCard({title, channel,onClick, image, url, id}: BookmarkCardProps) {

  return (
    <div className='flex flex-row justify-between items-center p-1 border rounded-md border-cyan-600'>
      <a href={url} target="_blank" className="flex flex-row gap-3 item-center no-underline appearance-none">
        <div className="flex max-w-10 rounded-md ">
          <img src={image} className="object-cover" alt="thumbnail" />
        </div>
        <div className="flex flex-col item-center justify-start">
          <p className="text-xs">{title?.substring(0,40)+'...'}</p>
          <p className="text-xs text-gray-400">{channel}</p>
        </div>
      </a>
      <Tooltip tooltip="Delete" direction="bottom-0 right-6">
        <Button className="mr-1" id={id} onClick={onClick}>
          <Trash2Icon size={20} color="red" />
        </Button>
      </Tooltip>
    </div>
  )
}
