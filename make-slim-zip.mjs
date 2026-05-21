import archiver from 'archiver';
import fs from 'fs';
import path from 'path';

const output = fs.createWriteStream('anyhave-site-noui.zip');
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  console.log(`Created anyhave-site-noui.zip (${(archive.pointer() / 1024 / 1024).toFixed(1)}MB)`);
});

archive.on('error', (err) => { throw err; });

archive.pipe(output);

const outDir = 'out';
const entries = fs.readdirSync(outDir);

for (const entry of entries) {
  const fullPath = path.join(outDir, entry);
  const stat = fs.statSync(fullPath);
  if (entry === 'images') {
    console.log('Skipping images/ directory');
    continue;
  }
  if (stat.isDirectory()) {
    archive.directory(fullPath, entry);
  } else {
    archive.file(fullPath, { name: entry });
  }
}

await archive.finalize();
