import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { savePhotoToStorage, getAllStoredPhotos, clearAllPhotosFromStorage, removePhotoFromStorage } from '../utils/photoStorage';
import { BUNDLED_UPLOADED_PHOTOS } from '../data/uploadedPhotosData';

export type PhotoScope = 'all' | 'home_circles' | 'home_sections' | 'core_pages' | 'events_gallery';

export interface PhotoSlot {
  id: string;
  marathiTitle: string;
  englishTitle: string;
  category: 'drone' | 'police' | 'abhyasika' | 'library' | 'campus' | 'events' | 'coaching';
  scope: 'home_circles' | 'home_sections' | 'core_pages' | 'events_gallery';
  destinationDesc: string;
  recommendedWhatsAppFile: string;
  defaultSrc: string;
  isCircle?: boolean;
  pagePath?: string;
  fallbackSlotId?: string;
}

export const PHOTO_SLOTS: PhotoSlot[] = [
  // =========================================================================
  // 1. HOMEPAGE CIRCLE PORTRAITS (होमपेज हेरो वर्तुळाकार प्रेरणा पोर्ट्रेट्स)
  // =========================================================================
  {
    id: 'dr_ambedkar_hero',
    marathiTitle: 'भारतरत्न डॉ. बाबासाहेब आंबेडकर (होमपेज डावे वर्तुळ)',
    englishTitle: 'Bharat Ratna Dr. B. R. Ambedkar (Homepage Left Circle Portrait)',
    category: 'library',
    scope: 'home_circles',
    isCircle: true,
    pagePath: 'मुख्य होमपेज (#/home)',
    destinationDesc: 'मुख्य होमपेज हेरो बॅनर - डावीकडील वर्तुळाकार प्रेरणा पोर्ट्रेट (Dr. Ambedkar Library)',
    recommendedWhatsAppFile: 'WhatsApp Image 2026-10-16 at 11.14.37 AM (1).jpeg',
    defaultSrc: '/uploads/dr_ambedkar_hero.jpg',
  },
  {
    id: 'taporatna_swamiji_hero',
    marathiTitle: 'लिंगैक्य श्री. ष. ब्र. तपोरत्नं योगिराजेंद्र शिवाचार्य महास्वामीजी (होमपेज उजवे वर्तुळ)',
    englishTitle: 'Taporatna Yogirajendra Shivacharya Mahaswamiji (Homepage Right Circle Portrait)',
    category: 'abhyasika',
    scope: 'home_circles',
    isCircle: true,
    pagePath: 'मुख्य होमपेज (#/home)',
    destinationDesc: 'मुख्य होमपेज हेरो बॅनर - उजवीकडील वर्तुळाकार प्रेरणा पोर्ट्रेट (तपोरत्न अभ्यासिका)',
    recommendedWhatsAppFile: 'WhatsApp Image 2026-10-16 at 11.14.37 AM.jpeg',
    defaultSrc: '/uploads/taporatna_swamiji_hero.jpg',
  },

  // =========================================================================
  // 2. HOMEPAGE SECTION IMAGES (मुख्य होमपेजवरील विभाग कार्डे)
  // =========================================================================
  {
    id: 'home_building_exterior',
    marathiTitle: 'MSR\'s Academy २ मजली मुख्य इमारत व परिसर (होमपेज)',
    englishTitle: '2-Storey Building Exterior with Balcony & Campus (Homepage)',
    category: 'campus',
    scope: 'home_sections',
    pagePath: 'मुख्य होमपेज (#/home)',
    destinationDesc: 'मुख्य होमपेज परिचय व हेरो कॅम्पस दृश्य',
    recommendedWhatsAppFile: 'WhatsApp Image 2026-09-24 at 3.13.31 PM.jpeg',
    defaultSrc: '/uploads/building_exterior.jpg',
    fallbackSlotId: 'building_exterior',
  },
  {
    id: 'home_tapovan_cubicles',
    marathiTitle: 'तपोरत्न अभ्यासिका - मुलींचे स्वतंत्र क्युबिकल्स (होमपेज विभाग)',
    englishTitle: 'Taporatna Girls Study Hall Cubicles (Homepage Section)',
    category: 'abhyasika',
    scope: 'home_sections',
    pagePath: 'मुख्य होमपेज (#/home)',
    destinationDesc: 'मुख्य होमपेज "तपोरत्न अभ्यासिका" कार्ड',
    recommendedWhatsAppFile: 'WhatsApp Image 2026-09-24 at 3.13.32 PM.jpeg',
    defaultSrc: '/uploads/tapovan_cubicles.jpg',
    fallbackSlotId: 'tapovan_cubicles',
  },
  {
    id: 'home_library_welcome',
    marathiTitle: 'डॉ. बाबासाहेब आंबेडकर ग्रंथालय स्वागत दालन (होमपेज विभाग)',
    englishTitle: 'Library Welcome Hall & Display (Homepage Section)',
    category: 'library',
    scope: 'home_sections',
    pagePath: 'मुख्य होमपेज (#/home)',
    destinationDesc: 'मुख्य होमपेज "डॉ. आंबेडकर ग्रंथालय" मुख्य कार्ड',
    recommendedWhatsAppFile: 'WhatsApp Image 2026-09-24 at 3.09.11 PM (1).jpeg',
    defaultSrc: '/uploads/library_welcome.jpg',
    fallbackSlotId: 'library_welcome',
  },
  {
    id: 'home_library_books',
    marathiTitle: 'ग्रंथालय संदर्भ कपाट व ग्रंथ संग्रह (होमपेज विभाग)',
    englishTitle: 'Library Reference Bookshelf (Homepage Section)',
    category: 'library',
    scope: 'home_sections',
    pagePath: 'मुख्य होमपेज (#/home)',
    destinationDesc: 'मुख्य होमपेज ग्रंथालय विभाग - संदर्भ ग्रंथ कपाट',
    recommendedWhatsAppFile: 'WhatsApp Image 2026-09-24 at 3.09.11 PM.jpeg',
    defaultSrc: '/uploads/library_books_closeup.jpg',
    fallbackSlotId: 'library_books_closeup',
  },
  {
    id: 'home_drone_puja',
    marathiTitle: 'कृषी फवारणी ड्रोन लोकार्पण व पूजन (होमपेज विभाग)',
    englishTitle: 'Agricultural Drone Launch Ceremony (Homepage Section)',
    category: 'drone',
    scope: 'home_sections',
    pagePath: 'मुख्य होमपेज (#/home)',
    destinationDesc: 'मुख्य होमपेज "मशाळे ॲग्रिकल्चरल सर्व्हिसेस" मुख्य कार्ड',
    recommendedWhatsAppFile: 'WhatsApp Image 2026-09-24 at 3.17.03 PM.jpeg',
    defaultSrc: '/uploads/drone_puja.jpg',
    fallbackSlotId: 'drone_puja',
  },
  {
    id: 'home_drone_students',
    marathiTitle: 'ड्रोन, संचालक व विद्यार्थी गट (होमपेज विभाग)',
    englishTitle: 'Director & Students with Drone (Homepage Section)',
    category: 'drone',
    scope: 'home_sections',
    pagePath: 'मुख्य होमपेज (#/home)',
    destinationDesc: 'मुख्य होमपेज कृषी ड्रोन विभाग - टीम छायाचित्र',
    recommendedWhatsAppFile: 'WhatsApp Image 2026-09-24 at 3.17.01 PM.jpeg',
    defaultSrc: '/uploads/drone_students_group.jpg',
    fallbackSlotId: 'drone_students_group',
  },
  {
    id: 'home_drone_family',
    marathiTitle: 'ड्रोन लोकार्पण - शेतकरी, कुटुंब व संचालक (होमपेज विभाग)',
    englishTitle: 'Family & Farmers at Drone Launch (Homepage Section)',
    category: 'drone',
    scope: 'home_sections',
    pagePath: 'मुख्य होमपेज (#/home)',
    destinationDesc: 'मुख्य होमपेज कृषी विभाग - शेतकरी सोहळा',
    recommendedWhatsAppFile: 'WhatsApp Image 2026-09-24 at 3.17.00 PM.jpeg',
    defaultSrc: '/uploads/drone_family.jpg',
    fallbackSlotId: 'drone_family',
  },
  {
    id: 'home_coaching_students',
    marathiTitle: 'शालेय कोचिंग क्लासेस विद्यार्थी गट (होमपेज विभाग)',
    englishTitle: 'School Coaching Students Batch (Homepage Section)',
    category: 'coaching',
    scope: 'home_sections',
    pagePath: 'मुख्य होमपेज (#/home)',
    destinationDesc: 'मुख्य होमपेजवरील "१ ली ते १० वी कोचिंग" मुख्य कार्ड',
    recommendedWhatsAppFile: 'WhatsApp Image 2026-09-24 at 3.09.12 PM (1).jpeg',
    defaultSrc: '/uploads/coaching_students.jpg',
    fallbackSlotId: 'coaching_students',
  },
  {
    id: 'home_police_banner',
    marathiTitle: 'मुंबई पोलीस दल निवड - कु. लक्ष्मी सोनकडे (यशोगाथा)',
    englishTitle: 'Mumbai Police Selection Felicitation Banner',
    category: 'police',
    scope: 'home_sections',
    pagePath: 'मुख्य होमपेज (#/home)',
    destinationDesc: 'मुख्य होमपेज स्पर्धा परीक्षा यशोगाथा दालन',
    recommendedWhatsAppFile: 'WhatsApp Image 2026-09-24 at 3.17.02 PM.jpeg',
    defaultSrc: '/uploads/police_banner.jpg',
    fallbackSlotId: 'police_banner',
  },
  {
    id: 'home_students_celebration',
    marathiTitle: 'ग्रंथालय स्नेहसंमेलन व सत्कार सोहळा',
    englishTitle: 'Director in Navy Suit & Students Celebration',
    category: 'events',
    scope: 'home_sections',
    pagePath: 'मुख्य होमपेज (#/home)',
    destinationDesc: 'अकॅडमी उपक्रम, स्नेहसंमेलन व गॅलरी',
    recommendedWhatsAppFile: 'WhatsApp Image 2026-09-24 at 3.09.12 PM (1).jpeg',
    defaultSrc: '/uploads/students_celebration.jpg',
    fallbackSlotId: 'students_celebration',
  },
  {
    id: 'home_ambedkar_shivaji_puja',
    marathiTitle: 'महामानव डॉ. आंबेडकर व छत्रपती शिवराय वंदना',
    englishTitle: 'Tribute to Dr. Ambedkar & Chhatrapati Shivaji Maharaj',
    category: 'events',
    scope: 'home_sections',
    pagePath: 'मुख्य होमपेज (#/home)',
    destinationDesc: 'अकॅडमी प्रेरणास्थान, ग्रंथालय वंदना व गॅलरी',
    recommendedWhatsAppFile: 'WhatsApp Image 2026-09-24 at 3.09.12 PM.jpeg',
    defaultSrc: '/uploads/ambedkar_shivaji_puja.jpg',
    fallbackSlotId: 'ambedkar_shivaji_puja',
  },

  // =========================================================================
  // 3. CORE SECTION DEDICATED PAGES (स्वतंत्र मुख्य विभाग पाने - होमपेजपेक्षा वेगळे)
  // =========================================================================
  {
    id: 'core_library_welcome',
    marathiTitle: 'ग्रंथालय स्वागत दालन व मांडणी (लायब्ररी स्वतंत्र पान)',
    englishTitle: 'Library Welcome Hall & Displays (Library Dedicated Page)',
    category: 'library',
    scope: 'core_pages',
    pagePath: 'ग्रंथालय स्वतंत्र पान (#/library)',
    destinationDesc: 'ग्रंथालय स्वतंत्र पान - स्वागत दालन व वाचन परिसर कार्ड',
    recommendedWhatsAppFile: 'WhatsApp Image 2026-09-24 at 3.09.11 PM (1).jpeg',
    defaultSrc: '/uploads/library_welcome.jpg',
    fallbackSlotId: 'home_library_welcome',
  },
  {
    id: 'core_tapovan_cubicles',
    marathiTitle: 'तपोरत्न अभ्यासिका - मुलींचे क्युबिकल्स (लायब्ररी व अभ्यासिका पान)',
    englishTitle: 'Taporatna Girls Study Cubicles (Library & Abhyasika Page)',
    category: 'abhyasika',
    scope: 'core_pages',
    pagePath: 'ग्रंथालय स्वतंत्र पान (#/library)',
    destinationDesc: 'ग्रंथालय व अभ्यासिका स्वतंत्र पान - विद्यार्थिनी क्युबिकल्स कार्ड',
    recommendedWhatsAppFile: 'WhatsApp Image 2026-09-24 at 3.13.32 PM.jpeg',
    defaultSrc: '/uploads/tapovan_cubicles.jpg',
    fallbackSlotId: 'home_tapovan_cubicles',
  },
  {
    id: 'core_library_books',
    marathiTitle: 'स्पर्धा परीक्षा संदर्भ ग्रंथ कपाट (लायब्ररी स्वतंत्र पान)',
    englishTitle: 'Competitive Exam Bookshelves (Library Dedicated Page)',
    category: 'library',
    scope: 'core_pages',
    pagePath: 'ग्रंथालय स्वतंत्र पान (#/library)',
    destinationDesc: 'ग्रंथालय स्वतंत्र पान - संदर्भ ग्रंथ कपाट कार्ड',
    recommendedWhatsAppFile: 'WhatsApp Image 2026-09-24 at 3.09.11 PM.jpeg',
    defaultSrc: '/uploads/library_books_closeup.jpg',
    fallbackSlotId: 'home_library_books',
  },
  {
    id: 'core_library_showcase',
    marathiTitle: 'ग्रंथालय पुरस्कार, स्मृतिचिन्हे व बुद्ध मूर्ती दालन (लायब्ररी स्वतंत्र पान)',
    englishTitle: 'Awards, Buddha Statue & Showcase (Library Dedicated Page)',
    category: 'library',
    scope: 'core_pages',
    pagePath: 'ग्रंथालय स्वतंत्र पान (#/library)',
    destinationDesc: 'ग्रंथालय स्वतंत्र पान - उपलब्धी व स्मृतिचिन्हे दालन',
    recommendedWhatsAppFile: 'WhatsApp Image 2026-09-24 at 3.12.28 PM.jpeg',
    defaultSrc: '/uploads/library_showcase.jpg',
    fallbackSlotId: 'library_showcase',
  },
  {
    id: 'core_agriculture_drone_puja',
    marathiTitle: 'कृषी फवारणी ड्रोन लोकार्पण सोहळा (कृषी स्वतंत्र पान)',
    englishTitle: 'Agricultural Drone Puja & Inauguration (Agriculture Page)',
    category: 'drone',
    scope: 'core_pages',
    pagePath: 'कृषी ड्रोन स्वतंत्र पान (#/agriculture)',
    destinationDesc: 'कृषी ड्रोन स्वतंत्र पान - मुख्य लोकार्पण व फवारणी कार्ड',
    recommendedWhatsAppFile: 'WhatsApp Image 2026-09-24 at 3.17.03 PM.jpeg',
    defaultSrc: '/uploads/drone_puja.jpg',
    fallbackSlotId: 'home_drone_puja',
  },
  {
    id: 'core_agriculture_drone_team',
    marathiTitle: 'ड्रोन तंत्रज्ञान, संचालक व विद्यार्थी संघ (कृषी स्वतंत्र पान)',
    englishTitle: 'Director & Students Drone Team (Agriculture Page)',
    category: 'drone',
    scope: 'core_pages',
    pagePath: 'कृषी ड्रोन स्वतंत्र पान (#/agriculture)',
    destinationDesc: 'कृषी ड्रोन स्वतंत्र पान - तंत्रज्ञान संघ कार्ड',
    recommendedWhatsAppFile: 'WhatsApp Image 2026-09-24 at 3.17.01 PM.jpeg',
    defaultSrc: '/uploads/drone_students_group.jpg',
    fallbackSlotId: 'home_drone_students',
  },
  {
    id: 'core_agriculture_drone_farmers',
    marathiTitle: 'शेतकरी कुटुंब व ड्रोन लोकार्पण सोहळा (कृषी स्वतंत्र पान)',
    englishTitle: 'Family & Farmers at Launch (Agriculture Page)',
    category: 'drone',
    scope: 'core_pages',
    pagePath: 'कृषी ड्रोन स्वतंत्र पान (#/agriculture)',
    destinationDesc: 'कृषी ड्रोन स्वतंत्र पान - शेतकरी सहभाग कार्ड',
    recommendedWhatsAppFile: 'WhatsApp Image 2026-09-24 at 3.17.00 PM.jpeg',
    defaultSrc: '/uploads/drone_family.jpg',
    fallbackSlotId: 'home_drone_family',
  },
  {
    id: 'core_coaching_batch',
    marathiTitle: '१ ली ते १० वी शालेय कोचिंग बॅच (कोचिंग स्वतंत्र पान)',
    englishTitle: 'School Coaching Classroom Batch (Coaching Page)',
    category: 'coaching',
    scope: 'core_pages',
    pagePath: 'शालेय कोचिंग स्वतंत्र पान (#/coaching)',
    destinationDesc: 'शालेय कोचिंग स्वतंत्र पान - मुख्य वर्गखोली व विद्यार्थी फोटो',
    recommendedWhatsAppFile: 'WhatsApp Image 2026-09-24 at 3.09.12 PM (1).jpeg',
    defaultSrc: '/uploads/coaching_students.jpg',
    fallbackSlotId: 'home_coaching_students',
  },
  {
    id: 'core_about_campus',
    marathiTitle: 'MSR\'s Academy २-मजली मुख्य इमारत व परिसर (आमच्याबद्दल पान)',
    englishTitle: 'Academy 2-Storey Campus Architecture (About Us Page)',
    category: 'campus',
    scope: 'core_pages',
    pagePath: 'आमच्याबद्दल स्वतंत्र पान (#/about-page)',
    destinationDesc: 'आमच्याबद्दल स्वतंत्र पान - अकॅडमी कॅम्पस परिचय',
    recommendedWhatsAppFile: 'WhatsApp Image 2026-09-24 at 3.13.31 PM.jpeg',
    defaultSrc: '/uploads/building_exterior.jpg',
    fallbackSlotId: 'home_building_exterior',
  },
];

interface PhotoContextType {
  photos: Record<string, string>;
  getPhotoSrc: (slotId: string, fallbackSlotId?: string) => string;
  updatePhoto: (slotId: string, dataUrl: string, originalFilename?: string) => Promise<void>;
  resetPhoto: (slotId: string) => Promise<void>;
  bulkImportFiles: (files: FileList | File[]) => Promise<{ matched: number; total: number }>;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  activeSlotForEdit: PhotoSlot | null;
  setActiveSlotForEdit: (slot: PhotoSlot | null) => void;
  openPhotoManagerForSlot: (slotId?: string) => void;
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

  const [activeSlotForEdit, setActiveSlotForEdit] = useState<PhotoSlot | null>(null);

  const getPhotoSrc = (slotId: string, fallbackSlotId?: string): string => {
    const rawClean = slotId.replace(/^(home_|core_)/, '');
    const candidates = [
      slotId,
      fallbackSlotId,
      `home_${rawClean}`,
      `core_${rawClean}`,
      rawClean,
    ].filter(Boolean) as string[];

    // 1. Check user-uploaded photos state
    for (const key of candidates) {
      if (photos[key] && photos[key].trim() !== '') return photos[key];
    }

    // 2. Check bundled uploaded photos
    for (const key of candidates) {
      if (BUNDLED_UPLOADED_PHOTOS[key] && BUNDLED_UPLOADED_PHOTOS[key].trim() !== '') return BUNDLED_UPLOADED_PHOTOS[key];
    }

    // 3. Find in PHOTO_SLOTS by id or fallbackSlotId
    const slotDef = PHOTO_SLOTS.find(s => 
      candidates.includes(s.id) || 
      (s.fallbackSlotId && candidates.includes(s.fallbackSlotId))
    );
    if (slotDef && slotDef.defaultSrc) {
      return slotDef.defaultSrc;
    }

    // 4. Default to standard static upload path
    return `/uploads/${rawClean}.jpg`;
  };

  const openPhotoManagerForSlot = (slotId?: string) => {
    if (slotId) {
      const found = PHOTO_SLOTS.find(s => s.id === slotId);
      if (found) {
        setActiveSlotForEdit(found);
      }
    } else {
      setActiveSlotForEdit(null);
    }
    setIsModalOpen(true);
  };

  const resetPhoto = async (slotId: string) => {
    await removePhotoFromStorage(slotId);
    setPhotos(prev => {
      const copy = { ...prev };
      delete copy[slotId];
      return copy;
    });
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
    resetPhoto,
    bulkImportFiles,
    isModalOpen,
    setIsModalOpen,
    activeSlotForEdit,
    setActiveSlotForEdit,
    openPhotoManagerForSlot,
    resetAllPhotos,
  }), [photos, isModalOpen, activeSlotForEdit]);

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
