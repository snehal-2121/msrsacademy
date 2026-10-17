// IndexedDB helper for high-resolution photo storage in browser

const DB_NAME = 'msr_academy_photos_db';
const DB_VERSION = 1;
const STORE_NAME = 'real_photos';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function savePhotoToStorage(slotId: string, dataUrl: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(dataUrl, slotId);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    console.warn('Failed to save in IndexedDB, fallback to localStorage', e);
    try {
      localStorage.setItem(`msr_photo_${slotId}`, dataUrl);
    } catch {
      // ignore
    }
  }
}

export async function getPhotoFromStorage(slotId: string): Promise<string | null> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(slotId);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  } catch {
    return localStorage.getItem(`msr_photo_${slotId}`) || null;
  }
}

export async function getAllStoredPhotos(): Promise<Record<string, string>> {
  const result: Record<string, string> = {};

  // 1. Recover any photos saved in localStorage (from earlier versions or fallback)
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;
      const val = localStorage.getItem(key);
      if (!val) continue;

      if (val.startsWith('data:image')) {
        const cleanSlotId = key.replace(/^msr_photo_/, '');
        result[cleanSlotId] = val;
      } else if (val.startsWith('{')) {
        try {
          const parsed = JSON.parse(val);
          if (parsed && typeof parsed === 'object') {
            for (const [k, v] of Object.entries(parsed)) {
              if (typeof v === 'string' && v.startsWith('data:image')) {
                result[k] = v;
              }
            }
          }
        } catch {
          // ignore non-JSON
        }
      }
    }
  } catch {
    // ignore localStorage errors
  }

  // 2. Read from IndexedDB
  try {
    const db = await openDB();
    await new Promise<void>((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.openCursor();
      req.onsuccess = (e: any) => {
        const cursor = e.target.result;
        if (cursor) {
          if (typeof cursor.value === 'string' && cursor.value.startsWith('data:image')) {
            result[cursor.key as string] = cursor.value;
          }
          cursor.continue();
        } else {
          resolve();
        }
      };
      req.onerror = () => resolve();
    });
  } catch {
    // ignore IndexedDB errors
  }

  return result;
}

export async function clearAllPhotosFromStorage(): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).clear();
  } catch {
    // ignore
  }
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && (k.startsWith('msr_photo_') || k.includes('photo'))) {
        keysToRemove.push(k);
      }
    }
    keysToRemove.forEach(k => localStorage.removeItem(k));
  } catch {
    // ignore
  }
}

export async function removePhotoFromStorage(slotId: string): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete(slotId);
  } catch {
    // ignore
  }
  try {
    localStorage.removeItem(`msr_photo_${slotId}`);
  } catch {
    // ignore
  }
}
