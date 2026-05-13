const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imagesDir = path.join(__dirname, 'out', 'images');

async function compressImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const tempPath = filePath + '.tmp';

  try {
    let pipeline = sharp(filePath).resize({ width: 1200, withoutEnlargement: true });

    if (ext === '.png') {
      pipeline = pipeline.png({ quality: 80, compressionLevel: 9 });
    } else if (ext === '.jpg' || ext === '.jpeg') {
      pipeline = pipeline.jpeg({ quality: 80, progressive: true });
    } else if (ext === '.webp') {
      pipeline = pipeline.webp({ quality: 80 });
    } else {
      return;
    }

    await pipeline.toFile(tempPath);
    const originalSize = fs.statSync(filePath).size;
    const newSize = fs.statSync(tempPath).size;
    fs.renameSync(tempPath, filePath);
    console.log(`Compressed: ${path.basename(filePath)} ${(originalSize / 1024 / 1024).toFixed(2)}MB -> ${(newSize / 1024 / 1024).toFixed(2)}MB`);
  } catch (err) {
    console.error(`Failed to compress ${filePath}:`, err.message);
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
  }
}

async function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath);
    } else if (/\.(png|jpe?g|webp)$/i.test(entry.name)) {
      await compressImage(fullPath);
    }
  }
}

walk(imagesDir).then(() => console.log('Done'));
