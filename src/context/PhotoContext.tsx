import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { savePhotoToStorage, getAllStoredPhotos, clearAllPhotosFromStorage } from '../utils/photoStorage';
import { BUNDLED_UPLOADED_PHOTOS } from '../data/uploadedPhotosData';

export interface PhotoSlot {
  id: string;
  marathiTitle: string;
  englishTitle: string;
  category: 'drone' | 'police' | 'abhyasika' | 'library' | 'campus' | 'events' | 'coaching';
  destinationDesc: string;
  recommendedWhatsAppFile: string;
  defaultSrc: string;
}

export const PHOTO_SLOTS: PhotoSlot[] = [
  {
    id: 'dr_ambedkar_hero',
    marathiTitle: 'भारतरत्न डॉ. बाबासाहेब आंबेडकर (होमपेज मूळ पोर्ट्रेट)',
    englishTitle: 'Bharat Ratna Dr. B. R. Ambedkar (Homepage Original Portrait)',
    category: 'library',
    destinationDesc: 'मुख्य होमपेज हेरो बॅनर - डावीकडील प्रेरणा पोर्ट्रेट (Dr. Ambedkar Library)',
    recommendedWhatsAppFile: 'WhatsApp Image 2026-10-16 at 11.14.37 AM (1).jpeg',
    defaultSrc: '/uploads/dr_ambedkar_hero.jpg',
  },
  {
    id: 'taporatna_swamiji_hero',
    marathiTitle: 'लिंगैक्य श्री. ष. ब्र. तपोरत्नं योगिराजेंद्र शिवाचार्य महास्वामीजी (होमपेज मूळ पोर्ट्रेट)',
    englishTitle: 'Taporatna Yogirajendra Shivacharya Mahaswamiji (Homepage Original Portrait)',
    category: 'abhyasika',
    destinationDesc: 'मुख्य होमपेज हेरो बॅनर - उजवीकडील तपोरत्न अभ्यासिका प्रेरणा पोर्ट्रेट',
    recommendedWhatsAppFile: 'WhatsApp Image 2026-10-16 at 11.14.37 AM.jpeg',
    defaultSrc: '/uploads/taporatna_swamiji_hero.jpg',
  },
  {
    id: 'drone_puja',
    marathiTitle: 'कृषी फवारणी ड्रोन लोकार्पण व पूजन',
    englishTitle: 'Agricultural Drone Launch & Puja Ceremony',
    category: 'drone',
    destinationDesc: 'मशाळे ॲग्रिकल्चरल सर्व्हिसेस - ड्रोन मुख्य दृश्य आणि फवारणी माहिती',
    recommendedWhatsAppFile: 'WhatsApp Image 2026-09-24 at 3.17.03 PM.jpeg',
    defaultSrc: '',
  },
  {
    id: 'police_banner',
    marathiTitle: 'मुंबई शहर पोलीस दल निवड - कु. लक्ष्मी सोनकडे',
    englishTitle: 'Mumbai Police Selection Felicitation Banner',
    category: 'police',
    destinationDesc: 'स्पर्धा परीक्षा यशोगाथा दालन (Success Story Banner)',
    recommendedWhatsAppFile: 'WhatsApp Image 2026-09-24 at 3.17.02 PM.jpeg',
    defaultSrc: '',
  },
  {
    id: 'drone_students_group',
    marathiTitle: 'संचालक, विद्यार्थी व कृषी ड्रोन गट छायाचित्र',
    englishTitle: 'Director, Students & Family with Drone',
    category: 'drone',
    destinationDesc: 'कृषी ड्रोन विभाग आणि गॅलरी',
    recommendedWhatsAppFile: 'WhatsApp Image 2026-09-24 at 3.17.01 PM.jpeg',
    defaultSrc: '',
  },
  {
    id: 'drone_family',
    marathiTitle: 'ड्रोन लोकार्पण - कुटुंबिय, संचालक व शेतकरी',
    englishTitle: 'Family & Farmers at Drone Inauguration',
    category: 'drone',
    destinationDesc: 'कृषी फवारणी विभाग (टीम व संचालक सोहळा)',
    recommendedWhatsAppFile: 'WhatsApp Image 2026-09-24 at 3.17.00 PM.jpeg',
    defaultSrc: '',
  },
  {
    id: 'students_celebration',
    marathiTitle: 'ग्रंथालय स्नेहसंमेलन व सत्कार सोहळा',
    englishTitle: 'Director in Navy Suit & Students with Tricolor Rosettes',
    category: 'events',
    destinationDesc: 'अकॅडमी उपक्रम, स्नेहसंमेलन व गॅलरी',
    recommendedWhatsAppFile: 'WhatsApp Image 2026-09-24 at 3.09.12 PM (1).jpeg',
    defaultSrc: '',
  },
  {
    id: 'ambedkar_shivaji_puja',
    marathiTitle: 'महामानव डॉ. आंबेडकर व छत्रपती शिवराय वंदना',
    englishTitle: 'Tribute to Dr. Ambedkar & Chhatrapati Shivaji Maharaj',
    category: 'events',
    destinationDesc: 'अकॅडमी प्रेरणास्थान, ग्रंथालय वंदना व गॅलरी',
    recommendedWhatsAppFile: 'WhatsApp Image 2026-09-24 at 3.09.12 PM.jpeg',
    defaultSrc: '',
  },
  {
    id: 'library_welcome',
    marathiTitle: 'ग्रंथालय स्वागत दालन व WEL-COME सजावट',
    englishTitle: 'Library Welcome Hall & Golden Balloons Display',
    category: 'library',
    destinationDesc: 'डॉ. बाबासाहेब आंबेडकर ग्रंथालय मुख्य बॅनर',
    recommendedWhatsAppFile: 'WhatsApp Image 2026-09-24 at 3.09.11 PM (1).jpeg',
    defaultSrc: '',
  },
  {
    id: 'library_books_closeup',
    marathiTitle: 'ग्रंथालय स्पर्धा परीक्षा व संदर्भ ग्रंथ कपाट',
    englishTitle: 'Library Competitive Exam Book Collections',
    category: 'library',
    destinationDesc: 'डॉ. बाबासाहेब आंबेडकर ग्रंथालय - संदर्भ ग्रंथ विभाग',
    recommendedWhatsAppFile: 'WhatsApp Image 2026-09-24 at 3.09.11 PM.jpeg',
    defaultSrc: '',
  },
  {
    id: 'tapovan_cubicles',
    marathiTitle: 'तपोरत्न अभ्यासिका - मुलींसाठी स्वतंत्र क्युबिकल्स',
    englishTitle: 'Taporatna Girls Study Hall with Cubicles',
    category: 'abhyasika',
    destinationDesc: 'तपोरत्न अभ्यासिका मुख्य विभाग व सुविधा सूची',
    recommendedWhatsAppFile: 'WhatsApp Image 2026-09-24 at 3.13.32 PM.jpeg',
    defaultSrc: '',
  },
  {
    id: 'building_exterior',
    marathiTitle: 'MSR\'s Academy २ मजली मुख्य इमारत व परिसर',
    englishTitle: '2-Storey Building Exterior with Balcony & Buntings',
    category: 'campus',
    destinationDesc: 'मुख्य कॅम्पस परिचय, हेरो बॅनर व गॅलरी',
    recommendedWhatsAppFile: 'WhatsApp Image 2026-09-24 at 3.13.31 PM.jpeg',
    defaultSrc: '',
  },
  {
    id: 'library_showcase',
    marathiTitle: 'ग्रंथालय पुरस्कार, स्मृतिचिन्हे व बुद्ध मूर्ती दालन',
    englishTitle: 'Double White Bookshelves, Awards & Buddha Showcase',
    category: 'library',
    destinationDesc: 'ग्रंथालय दालन आणि अकॅडमी उपलब्धी',
    recommendedWhatsAppFile: 'WhatsApp Image 2026-09-24 at 3.12.28 PM.jpeg',
    defaultSrc: '',
  },
  {
    id: 'coaching_students',
    marathiTitle: 'शालेय कोचिंग व अकॅडमी विद्यार्थी गट',
    englishTitle: 'School Coaching & Academy Students Batch',
    category: 'coaching',
    destinationDesc: '१ ली ते १० वी कोचिंग क्लासेस (Coaching Section)',
    recommendedWhatsAppFile: 'WhatsApp Image 2026-09-24 at 3.09.12 PM (1).jpeg',
    defaultSrc: '',
  },
];

interface PhotoContextType {
  photos: Record<string, string>;
  getPhotoSrc: (slotId: string) => string;
  updatePhoto: (slotId: string, dataUrl: string, originalFilename?: string) => Promise<void>;
  bulkImportFiles: (files: FileList | File[]) => Promise<{ matched: number; total: number }>;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  resetAllPhotos: () => Promise<void>;
}

const PhotoContext = createContext<PhotoContextType | null>(null);

export const PhotoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [photos, setPhotos] = useState<Record<string, string>>(() => ({
    ...BUNDLED_UPLOADED_PHOTOS,
  }));
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize from browser IndexedDB and automatically sync to backend / bundled source files
  useEffect(() => {
    async function load() {
      const storedRaw = await getAllStoredPhotos();
      const validStored: Record<string, string> = {};

      for (const [key, val] of Object.entries(storedRaw)) {
        if (typeof val === 'string' && val.startsWith('data:image')) {
          validStored[key] = val;
        }
      }

      // Check server manifest for any photos saved on server
      let serverPhotos: Record<string, string> = {};
      try {
        const res = await fetch('/api/list-photos');
        const contentType = res.headers.get('content-type') || '';
        if (res.ok && contentType.includes('application/json')) {
          const data = await res.json();
          if (data.photosData && typeof data.photosData === 'object') {
            serverPhotos = data.photosData;
          }
        }
      } catch {
        // Ignore on static hosts
      }

      // Also check static manifest fallback on published site
      if (Object.keys(serverPhotos).length === 0) {
        try {
          const manifestRes = await fetch('/uploads/photos-manifest.json');
          const contentType = manifestRes.headers.get('content-type') || '';
          if (manifestRes.ok && contentType.includes('application/json')) {
            const manifestData = await manifestRes.json();
            if (manifestData && typeof manifestData === 'object') {
              serverPhotos = manifestData;
            }
          }
        } catch {
          // Ignore
        }
      }

      const merged: Record<string, string> = {
        ...BUNDLED_UPLOADED_PHOTOS,
        ...serverPhotos,
        ...validStored,
      };

      setPhotos(merged);

      // If browser IndexedDB has photos, automatically push them to the backend
      // so they get written into src/assets/images/ and src/data/uploadedPhotosData.ts for the hosted site!
      if (Object.keys(validStored).length > 0) {
        try {
          const compressedMap: Record<string, string> = {};
          for (const [slotId, dataUrl] of Object.entries(validStored)) {
            compressedMap[slotId] = await optimizeDataUrl(dataUrl);
          }
          await fetch('/api/sync-all-photos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ photos: compressedMap }),
          });
        } catch {
          // Ignore if running on static host without backend
        }
      }
    }
    load();
  }, []);

  const getPhotoSrc = (slotId: string): string => {
    if (photos[slotId] && photos[slotId].startsWith('data:image')) {
      return photos[slotId];
    }
    if (BUNDLED_UPLOADED_PHOTOS[slotId] && BUNDLED_UPLOADED_PHOTOS[slotId].startsWith('data:image')) {
      return BUNDLED_UPLOADED_PHOTOS[slotId];
    }
    return '';
  };

  const updatePhoto = async (slotId: string, rawDataUrl: string, originalFilename?: string) => {
    const dataUrl = await optimizeDataUrl(rawDataUrl);
    await savePhotoToStorage(slotId, dataUrl);

    try {
      await fetch('/api/save-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slotId,
          base64Data: dataUrl,
          filename: originalFilename,
        }),
      });
    } catch {
      // ignore
    }

    setPhotos(prev => ({
      ...prev,
      [slotId]: dataUrl,
    }));
  };

  const bulkImportFiles = async (files: FileList | File[]): Promise<{ matched: number; total: number }> => {
    const fileArray = Array.from(files);
    let matchedCount = 0;
    const usedSlotIds = new Set<string>();
    const unmatchedFiles: File[] = [];
    const batchMap: Record<string, string> = {};

    for (const file of fileArray) {
      const name = file.name;
      let matchedSlot: PhotoSlot | undefined;

      // 1. Exact match on recommended filename
      matchedSlot = PHOTO_SLOTS.find(s => s.recommendedWhatsAppFile.toLowerCase() === name.toLowerCase());

      // 2. Partial timestamp matches from the user's specific WhatsApp upload names
      if (!matchedSlot) {
        if (name.includes('11.14.37') && name.includes('(1)')) matchedSlot = PHOTO_SLOTS.find(s => s.id === 'dr_ambedkar_hero');
        else if (name.includes('11.14.37')) matchedSlot = PHOTO_SLOTS.find(s => s.id === 'taporatna_swamiji_hero');
        else if (name.includes('3.17.03')) matchedSlot = PHOTO_SLOTS.find(s => s.id === 'drone_puja');
        else if (name.includes('3.17.02')) matchedSlot = PHOTO_SLOTS.find(s => s.id === 'police_banner');
        else if (name.includes('3.17.01')) matchedSlot = PHOTO_SLOTS.find(s => s.id === 'drone_students_group');
        else if (name.includes('3.17.00')) matchedSlot = PHOTO_SLOTS.find(s => s.id === 'drone_family');
        else if (name.includes('3.09.12') && name.includes('(1)')) matchedSlot = PHOTO_SLOTS.find(s => s.id === 'students_celebration');
        else if (name.includes('3.09.12')) matchedSlot = PHOTO_SLOTS.find(s => s.id === 'ambedkar_shivaji_puja');
        else if (name.includes('3.09.11') && name.includes('(1)')) matchedSlot = PHOTO_SLOTS.find(s => s.id === 'library_welcome');
        else if (name.includes('3.09.11')) matchedSlot = PHOTO_SLOTS.find(s => s.id === 'library_books_closeup');
        else if (name.includes('3.13.32')) matchedSlot = PHOTO_SLOTS.find(s => s.id === 'tapovan_cubicles');
        else if (name.includes('3.13.31')) matchedSlot = PHOTO_SLOTS.find(s => s.id === 'building_exterior');
        else if (name.includes('3.12.28')) matchedSlot = PHOTO_SLOTS.find(s => s.id === 'library_showcase');
      }

      if (matchedSlot) {
        usedSlotIds.add(matchedSlot.id);
        const rawDataUrl = await readFileAsDataURL(file);
        const dataUrl = await optimizeDataUrl(rawDataUrl);
        await savePhotoToStorage(matchedSlot.id, dataUrl);
        batchMap[matchedSlot.id] = dataUrl;
        matchedCount++;

        // If it's the celebration photo, also populate coaching_students if not set
        if (matchedSlot.id === 'students_celebration' && !batchMap['coaching_students']) {
          await savePhotoToStorage('coaching_students', dataUrl);
          batchMap['coaching_students'] = dataUrl;
        }
      } else {
        unmatchedFiles.push(file);
      }
    }

    // 3. Fallback: assign any remaining files with different filenames (e.g. mobile picker) to unfilled slots first, then sequentially
    for (const file of unmatchedFiles) {
      let availableSlot = PHOTO_SLOTS.find(s => !usedSlotIds.has(s.id) && !photos[s.id] && !batchMap[s.id]);
      if (!availableSlot) {
        availableSlot = PHOTO_SLOTS.find(s => !usedSlotIds.has(s.id));
      }
      const rawDataUrl = await readFileAsDataURL(file);
      const dataUrl = await optimizeDataUrl(rawDataUrl);

      if (availableSlot) {
        usedSlotIds.add(availableSlot.id);
        await savePhotoToStorage(availableSlot.id, dataUrl);
        batchMap[availableSlot.id] = dataUrl;
        if (availableSlot.id === 'students_celebration' && !batchMap['coaching_students'] && !photos['coaching_students']) {
          await savePhotoToStorage('coaching_students', dataUrl);
          batchMap['coaching_students'] = dataUrl;
        }
      } else {
        const extraId = `custom_photo_${Date.now()}_${matchedCount}`;
        await savePhotoToStorage(extraId, dataUrl);
        batchMap[extraId] = dataUrl;
      }
      matchedCount++;
    }

    if (Object.keys(batchMap).length > 0) {
      setPhotos(prev => ({ ...prev, ...batchMap }));
      try {
        await fetch('/api/sync-all-photos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ photos: batchMap }),
        });
      } catch {
        // ignore
      }
    }

    return { matched: matchedCount, total: fileArray.length };
  };

  const resetAllPhotos = async () => {
    await clearAllPhotosFromStorage();
    setPhotos({});
  };

  const value = useMemo(() => ({
    photos,
    getPhotoSrc,
    updatePhoto,
    bulkImportFiles,
    isModalOpen,
    setIsModalOpen,
    resetAllPhotos,
  }), [photos, isModalOpen]);

  return (
    <PhotoContext.Provider value={value}>
      {children}
    </PhotoContext.Provider>
  );
};

export const usePhotos = () => {
  const context = useContext(PhotoContext);
  if (!context) throw new Error('usePhotos must be used within PhotoProvider');
  return context;
};

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function optimizeDataUrl(dataUrl: string, maxWidth = 1400, quality = 0.84): Promise<string> {
  return new Promise((resolve) => {
    if (!dataUrl || !dataUrl.startsWith('data:image')) {
      resolve(dataUrl);
      return;
    }
    const img = new Image();
    img.onload = () => {
      try {
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(dataUrl);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      } catch {
        resolve(dataUrl);
      }
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}
