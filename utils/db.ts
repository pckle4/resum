
import { ResumeData, INITIAL_RESUME_DATA } from '../types';

const DB_NAME = 'ResuMakersDB';
const STORE_NAME = 'resume_store';
const KEY = 'current_resume';
const DB_VERSION = 1;

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const saveToDB = async (data: ResumeData): Promise<void> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const request = store.put(data, KEY);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Error saving to DB:", error);
    // Fallback?
  }
};

export const loadFromDB = async (): Promise<ResumeData> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.get(KEY);

      request.onsuccess = () => {
        if (request.result) {
          resolve(request.result as ResumeData);
        } else {
          resolve(INITIAL_RESUME_DATA);
        }
      };
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Error loading from DB:", error);
    return INITIAL_RESUME_DATA;
  }
};

export const clearDB = async (): Promise<void> => {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readwrite');
            const store = tx.objectStore(STORE_NAME);
            const request = store.delete(KEY);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    } catch (error) {
        console.error("Error clearing DB", error);
    }
}
