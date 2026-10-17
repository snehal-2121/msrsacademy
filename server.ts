import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '50mb' }));

const SLOT_TO_ASSET_FILE: Record<string, string> = {
  dr_ambedkar_hero: 'dr_ambedkar_hero.jpg',
  taporatna_swamiji_hero: 'taporatna_swamiji_hero.jpg',
  drone_puja: 'drone_puja_launch.jpg',
  police_banner: 'police_selection_banner.jpg',
  drone_students_group: 'agriculture_drone_spraying_1790241084328.jpg',
  drone_family: 'drone_family_ceremony.jpg',
  students_celebration: 'students_library_event.jpg',
  ambedkar_shivaji_puja: 'ambedkar_shivaji_puja.jpg',
  library_welcome: 'library_welcome_shelves.jpg',
  library_books_closeup: 'library_welcome_shelves_1790243711751.jpg',
  tapovan_cubicles: 'tapovan_study_cubicles.jpg',
  building_exterior: 'academy_building_exterior.jpg',
  library_showcase: 'tapovan_girls_study_room_1790241066968.jpg',
  coaching_students: 'academy_classroom_coaching_1790241099777.jpg',
};

function persistPhotos(photosMap: Record<string, string>) {
  const uploadDir = path.resolve(__dirname, 'public', 'uploads');
  const distUploadDir = path.resolve(__dirname, 'dist', 'uploads');
  const assetsDir = path.resolve(__dirname, 'src', 'assets', 'images');
  const bundledDataFile = path.resolve(__dirname, 'src', 'data', 'uploadedPhotosData.ts');

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  if (fs.existsSync(path.resolve(__dirname, 'dist')) && !fs.existsSync(distUploadDir)) {
    fs.mkdirSync(distUploadDir, { recursive: true });
  }

  let existingMap: Record<string, string> = {};
  const manifestPath = path.join(uploadDir, 'photos-manifest.json');
  if (fs.existsSync(manifestPath)) {
    try {
      existingMap = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    } catch {
      existingMap = {};
    }
  }

  for (const [slotId, base64Data] of Object.entries(photosMap)) {
    if (!slotId || !base64Data || !base64Data.startsWith('data:image')) continue;
    existingMap[slotId] = base64Data;

    const matches = base64Data.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    const buffer = matches ? Buffer.from(matches[2], 'base64') : Buffer.from(base64Data, 'base64');

    fs.writeFileSync(path.join(uploadDir, `${slotId}.jpg`), buffer);
    if (fs.existsSync(distUploadDir)) {
      fs.writeFileSync(path.join(distUploadDir, `${slotId}.jpg`), buffer);
    }

    const assetFilename = SLOT_TO_ASSET_FILE[slotId];
    if (assetFilename && fs.existsSync(assetsDir)) {
      fs.writeFileSync(path.join(assetsDir, assetFilename), buffer);
    }
  }

  fs.writeFileSync(manifestPath, JSON.stringify(existingMap, null, 2), 'utf-8');
  if (fs.existsSync(distUploadDir)) {
    fs.writeFileSync(path.join(distUploadDir, 'photos-manifest.json'), JSON.stringify(existingMap, null, 2), 'utf-8');
  }

  if (fs.existsSync(path.dirname(bundledDataFile))) {
    const tsContent = `// Auto-generated and updated when real photos are synced via PhotoManagerModal or IndexedDB auto-sync.\n// Because this file lives in src/data/, Vite bundles these photos directly into the production build\n// so they always appear on the hosted/published website for all visitors.\n\nexport const BUNDLED_UPLOADED_PHOTOS: Record<string, string> = ${JSON.stringify(existingMap, null, 2)};\n`;
    fs.writeFileSync(bundledDataFile, tsContent, 'utf-8');
  }

  return existingMap;
}

app.post('/api/save-photo', (req, res) => {
  try {
    const { slotId, base64Data } = req.body || {};
    if (!slotId || !base64Data) {
      res.status(400).json({ error: 'Missing slotId or base64Data' });
      return;
    }
    persistPhotos({ [slotId]: base64Data });
    res.json({ success: true, url: `/uploads/${slotId}.jpg` });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/sync-all-photos', (req, res) => {
  try {
    const { photos } = req.body || {};
    if (!photos || typeof photos !== 'object') {
      res.status(400).json({ error: 'Missing photos map' });
      return;
    }
    const updated = persistPhotos(photos);
    res.json({ success: true, count: Object.keys(updated).length });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/list-photos', (_req, res) => {
  try {
    const uploadDir = path.resolve(__dirname, 'public', 'uploads');
    const files = fs.existsSync(uploadDir) ? fs.readdirSync(uploadDir) : [];
    const manifestPath = path.join(uploadDir, 'photos-manifest.json');
    let photosData: Record<string, string> = {};
    if (fs.existsSync(manifestPath)) {
      try {
        photosData = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
      } catch {
        photosData = {};
      }
    }
    res.json({ files, photosData });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

const publicUploadsPath = path.resolve(__dirname, 'public', 'uploads');
if (!fs.existsSync(publicUploadsPath)) {
  fs.mkdirSync(publicUploadsPath, { recursive: true });
}
app.use('/uploads', express.static(publicUploadsPath));

const publicDocumentsPath = path.resolve(__dirname, 'public', 'documents');
if (!fs.existsSync(publicDocumentsPath)) {
  fs.mkdirSync(publicDocumentsPath, { recursive: true });
}
app.use('/documents', express.static(publicDocumentsPath));

const distPath = path.resolve(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
