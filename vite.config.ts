import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, Plugin} from 'vite';

const SLOT_TO_ASSET_FILE: Record<string, string> = {
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

function persistPhotosToDisk(photosMap: Record<string, string>) {
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

  // Read existing bundled photos if present
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

    // 1. Write to public/uploads/<slotId>.jpg
    fs.writeFileSync(path.join(uploadDir, `${slotId}.jpg`), buffer);

    // 2. Write to dist/uploads/<slotId>.jpg if dist exists
    if (fs.existsSync(distUploadDir)) {
      fs.writeFileSync(path.join(distUploadDir, `${slotId}.jpg`), buffer);
    }

    // 3. Overwrite corresponding src/assets/images file so `vite build` bundles the real image
    const assetFilename = SLOT_TO_ASSET_FILE[slotId];
    if (assetFilename && fs.existsSync(assetsDir)) {
      fs.writeFileSync(path.join(assetsDir, assetFilename), buffer);
    }
  }

  // 4. Save manifest JSON in public/uploads
  fs.writeFileSync(manifestPath, JSON.stringify(existingMap, null, 2), 'utf-8');

  // 5. Save directly into src/data/uploadedPhotosData.ts so production builds embed it
  const tsContent = `// Auto-generated and updated when real photos are synced via PhotoManagerModal or IndexedDB auto-sync.\n// Because this file lives in src/data/, Vite bundles these photos directly into the production build\n// so they always appear on the hosted/published website for all visitors.\n\nexport const BUNDLED_UPLOADED_PHOTOS: Record<string, string> = ${JSON.stringify(existingMap, null, 2)};\n`;
  fs.writeFileSync(bundledDataFile, tsContent, 'utf-8');

  return existingMap;
}

function photoStoragePlugin(): Plugin {
  return {
    name: 'photo-storage-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.startsWith('/api/save-photo') && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              const { slotId, base64Data } = data;
              if (!slotId || !base64Data) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Missing slotId or base64Data' }));
                return;
              }

              persistPhotosToDisk({ [slotId]: base64Data });
              const bundledDataFile = path.resolve(__dirname, 'src', 'data', 'uploadedPhotosData.ts');
              const mod = server.moduleGraph.getModuleById(bundledDataFile);
              if (mod) {
                server.moduleGraph.invalidateModule(mod);
              }

              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(JSON.stringify({ success: true, url: `/uploads/${slotId}.jpg` }));
            } catch (err: any) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        if (req.url?.startsWith('/api/sync-all-photos') && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              const { photos } = data;
              if (!photos || typeof photos !== 'object') {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Missing photos map' }));
                return;
              }

              const updated = persistPhotosToDisk(photos);
              const bundledDataFile = path.resolve(__dirname, 'src', 'data', 'uploadedPhotosData.ts');
              const mod = server.moduleGraph.getModuleById(bundledDataFile);
              if (mod) {
                server.moduleGraph.invalidateModule(mod);
              }

              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(JSON.stringify({ success: true, count: Object.keys(updated).length }));
            } catch (err: any) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        if (req.url?.startsWith('/api/list-photos') && req.method === 'GET') {
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
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify({ files, photosData }));
          } catch (err: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
          }
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), photoStoragePlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
