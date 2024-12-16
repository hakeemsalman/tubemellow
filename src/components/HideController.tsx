import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Item } from "../utils/types";
import { initialData, TM_STORAGE_KEY } from "../static/constants";
import Toggle from "./Toggle";
import Heading from "./Heading";
import Tooltip from "./Tooltip";
import { sendMessage } from "../utils/factory";
import { getFromStorage, saveToStorage } from "../utils/storageManager.tsx";

export default function HideController() {
  const [isToggle, setisToggle] = useState<Item[]>(initialData); // map storage data
  const [t] = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getFromStorage(TM_STORAGE_KEY)
        console.log('TM_STORAGE_KEY:', result);
        if (result) {
          console.log("Retrieved toggle state:", result);
          setisToggle(result);
        } else {
          console.log("No toggle state found, applying default.");
          // chrome.storage.session.get(null, (result) => console.log(result)); //This will log all key-value pairs stored in `chrome.storage.local`.
        }
      } catch (error) {
        console.error("error in handling toggles",error)
      }
    };

    fetchData();
  }, []);

  const handleToggle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    const updatedToggle = isToggle.map((item) =>
      item.id === id ? { ...item, checked } : item
    );
    setisToggle(updatedToggle);
    await saveToStorage(TM_STORAGE_KEY, updatedToggle)
    const singleToggleButton = updatedToggle.find((item) => item.id === id);
    if (singleToggleButton) {
      try {
        const result = await sendMessage(singleToggleButton, 'modifyDom'); // Await the promise returned by sendMessage
        if (result) {
          console.log('Message sent successfully');
        } else {
          console.log('Message no youtube failed');
        }
      } catch (error) {
        console.log('Error in sendMessage in No youtube found:', error);
      }
    }
  };

  return (
    <div className="py-2">
      {isToggle.map((item: Item) => (
        <div className={`flex flex-row gap-3 items-center px-2`} key={item.id}>
          <Tooltip tooltip={item.checked ? 'ON' : 'OFF'} direction="bottom-0 left-12">
            <Toggle
              onChange={handleToggle}
              id={item.id}
              isChecked={item.checked}
              name={item.htmlId}
            />
          </Tooltip>
          <Heading>{t(`yt.${item.title}`)}</Heading>
        </div>
      ))}
    </div>
  )
}
