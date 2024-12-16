import { openDB } from "idb";
import { TM_STORE_NAME, TM_EXTENSION_DATA_KEY } from "../static/constants";



export const initializeDB = async () => {
  return await openDB(TM_EXTENSION_DATA_KEY, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(TM_STORE_NAME)) {
        db.createObjectStore(TM_STORE_NAME);
      }
    },
  });
};

export const saveToDB = async (key: string, value: any) => {
  const db = await initializeDB();
  await db.put(TM_STORE_NAME, value, key);
};

export const getFromDB = async (key: string) => {
  const db = await initializeDB();
  return await db.get(TM_STORE_NAME, key);
};

export const deleteFromDB = async (key: string) => {
  const db = await initializeDB();
  await db.delete(TM_STORE_NAME, key);
};
