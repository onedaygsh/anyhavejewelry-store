import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const IMAGES_DIR = './public/images';

function getAllPngFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllPngFiles(fullPath));
    } else if (entry.name.toLowerCase().endsWith('.png')) {
      files.push(fullPath);
    }
  }
  return files;
}

async function compressImage(inputPath) {
  const tempPath = inputPath + '.tmp';
  try {
    await sharp(inputPath)
      .png({ quality: 50, compressionLevel: 9, effort: 10 })
      .toFile(tempPath);

    const originalSize = fs.statSync(inputPath).size;
    const newSize = fs.statSync(tempPath).size;

    if (newSize < originalSize) {
      fs.renameSync(tempPath, inputPath);
      const saved = ((originalSize - newSize) / originalSize * 100).toFixed(1);
      console.log(`✓ ${path.basename(inputPath)}: ${(originalSize/1024).toFixed(0)}KB → ${(newSize/1024).toFixed(0)}KB (${saved}%)`);
    } else {
      fs.unlinkSync(tempPath);
      console.log(`- ${path.basename(inputPath)}: skipped`);
    }
  } catch (err) {
    console.error(`✗ ${path.basename(inputPath)}: ${err.message}`);
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
  }
}

async function main() {
  const files = getAllPngFiles(IMAGES_DIR);
  console.log(`Re-compressing ${files.length} PNG images with quality=50...\n`);

  for (const file of files) {
    await compressImage(file);
  }

  console.log('\nDone!');
}

main().catch(console.error);
