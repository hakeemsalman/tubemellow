import { Trash2Icon } from "lucide-react";
import Tooltip from "./Tooltip";
import Button from "./Button";

export default function BookmarkCard() {



  return (
    <div className='flex flex-row justify-between items-center p-1 border rounded-md border-cyan-600'>
      <a href="#" className="flex flex-row gap-3 item-center no-underline appearance-none">
        <div className="flex flex-col item-center justify-center rounded-md ">
          <img src="assets/icon-128.png" className="max-w-10" alt="thumbnail" />
        </div>
        <div className="flex flex-col item-center justify-start">
          <h6 className="text-base">{`Reprehenderit adipisicing temporvelit labore Lorem quis id labore irure anim. Cupidatat sunt ullamco esse labore sit sunt. Dolore et velit officia ad officia in voluptate nostrud nostrud ut qui tempor deserunt proident. Consequat ipsum ex reprehenderit laborum nisi incididunt amet sint duis velit reprehenderit. Occaecat amet ea eu aliqua velit adipisicing elit.`.length > 20 ? `loremNulla non cillum ipsum tempor eu mollit ea. Cillum dolor ad magna id eiusmod aute amet qui consequat commodo. Veniam excepteur aute eu nostrud nisi aliquip nulla voluptate labore ex non consequat fugiat`.substring(0, 28) + '...' : `title`}</h6>
          <p className="text-xs text-gray-400">channel name</p>
        </div>
      </a>
      <Tooltip tooltip="Delete" direction="bottom-0 right-6">
        <Button className="mr-1" id="delete-btn" onClick={() => alert('bookmark deleted')}>
          <Trash2Icon size={20} color="red" />
        </Button>
      </Tooltip>
    </div>
  )
}
