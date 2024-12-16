import { saveToDB, getFromDB, deleteFromDB } from "./indexedDBHelper";

export const saveToStorage = async (key: string, value: any) => {
  try {
    // Save to chrome.storage.local
    await chrome.storage.local.set({ [key]: value });
    await saveToDB(key, value);
  } catch (error) {
    console.error("Failed to save to chrome.storage.local, using IndexedDB", error);
    await saveToDB(key, value);
  }
};

export const getFromStorage = async (key: string) => {
  try {
    const result = await chrome.storage.local.get(key);
    if (result[key] !== undefined) {
      return result[key];
    }
  } catch (error) {
    console.warn("Failed to fetch from chrome.storage.local, using IndexedDB", error);
  }

  // Fallback to IndexedDB
  return await getFromDB(key);
};

export const deleteFromStorage = async (key: string) => {
  try {
    // Delete from chrome.storage.local
    await chrome.storage.local.remove(key);
    await deleteFromDB(key);
  } catch (error) {
    console.warn("Failed to delete from chrome.storage.local, using IndexedDB", error);
    await deleteFromDB(key);
  }
};
