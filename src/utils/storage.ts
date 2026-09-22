import type { ParsedVideoUrl, StorageKey } from "../types";

const KEYS: Record<StorageKey, string> = {
  history: "virgen.history",
  events: "virgen.events",
  videos: "virgen.videos",
  donations: "virgen.donations",
  donationSettings: "virgen.donationSettings",
  about: "virgen.about",
  seeded: "virgen.seeded",
};

const DB_NAME = "virgen-caridad-videos";
const STORE = "files";

const storageName = (key: StorageKey | string) =>
  (key in KEYS ? KEYS[key as StorageKey] : key);

export const loadJson = <T>(key: StorageKey | string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(storageName(key));
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const saveJson = (key: StorageKey | string, value: unknown) => {
  localStorage.setItem(storageName(key), JSON.stringify(value));
};

export const hasSeeded = () => localStorage.getItem(KEYS.seeded) === "1";

export const markSeeded = () => {
  localStorage.setItem(KEYS.seeded, "1");
};

const openDb = (): Promise<IDBDatabase> => {
  if (typeof indexedDB === "undefined") {
    return Promise.reject(new Error("IndexedDB is not available"));
  }
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const saveVideoBlob = async (id: string, blob: Blob) => {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(blob, id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  db.close();
};

export const getVideoBlob = async (id: string): Promise<Blob | null> => {
  if (typeof indexedDB === "undefined") return null;
  const db = await openDb();
  const blob = await new Promise<Blob | null>((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const request = tx.objectStore(STORE).get(id);
    request.onsuccess = () => resolve((request.result as Blob | undefined) || null);
    request.onerror = () => reject(request.error);
  });
  db.close();
  return blob;
};

export const deleteVideoBlob = async (id: string) => {
  if (typeof indexedDB === "undefined") return;
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  db.close();
};

export const createId = (prefix: string) =>
  `${prefix}-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;

export const parseVideoUrl = (url: string): ParsedVideoUrl => {
  if (!url) return { type: "none", embedUrl: "", videoId: "" };
  const trimmed = url.trim();

  const yt =
    trimmed.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
    ) || trimmed.match(/^[A-Za-z0-9_-]{11}$/);
  if (yt) {
    const videoId = yt[1] || yt[0];
    return {
      type: "youtube",
      embedUrl: `https://www.youtube.com/embed/${videoId}`,
      videoId,
    };
  }

  const vimeo = trimmed.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) {
    return {
      type: "vimeo",
      embedUrl: `https://player.vimeo.com/video/${vimeo[1]}`,
      videoId: vimeo[1],
    };
  }

  return { type: "url", embedUrl: trimmed, videoId: "" };
};

export const toPhoneHref = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.length === 10) return `tel:+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `tel:+${digits}`;
  return `tel:+${digits}`;
};
