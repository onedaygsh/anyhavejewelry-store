import { Client } from 'ssh2';
import fs from 'fs';

const HOST = '31.220.57.114';
const USER = 'root';
const PASS = 'Gsh19841108@@';
const LOCAL_ZIP = 'deploy-hostinger.zip';
const REMOTE_ZIP = '/root/deploy-hostinger.zip';

const conn = new Client();

function execCommand(cmd) {
  return new Promise((resolve, reject) => {
    conn.exec(cmd, (err, stream) => {
      if (err) return reject(err);
      let stdout = '';
      let stderr = '';
      stream.on('close', (code) => resolve({ code, stdout, stderr }));
      stream.on('data', (data) => { stdout += data; });
      stream.stderr.on('data', (data) => { stderr += data; });
    });
  });
}

function uploadFile(localPath, remotePath) {
  return new Promise((resolve, reject) => {
    conn.sftp((err, sftp) => {
      if (err) return reject(err);
      const totalSize = fs.statSync(localPath).size;
      let uploaded = 0;
      const readStream = fs.createReadStream(localPath);
      const writeStream = sftp.createWriteStream(remotePath);

      readStream.on('data', (chunk) => {
        uploaded += chunk.length;
        if (uploaded % (5 * 1024 * 1024) < chunk.length) {
          const pct = ((uploaded / totalSize) * 100).toFixed(1);
          console.log(`  Upload progress: ${pct}% (${(uploaded/1024/1024).toFixed(1)}MB / ${(totalSize/1024/1024).toFixed(1)}MB)`);
        }
      });

      writeStream.on('close', () => {
        sftp.end();
        resolve();
      });
      writeStream.on('error', reject);
      readStream.pipe(writeStream);
    });
  });
}

conn.on('ready', async () => {
  console.log('SSH connected successfully');

  const dirs = ['/var/www/html', '/usr/share/nginx/html', '/var/www', '~/public_html'];
  let webRoot = null;
  for (const dir of dirs) {
    const result = await execCommand(`ls -la ${dir} 2>/dev/null && echo EXISTS || echo NOTFOUND`);
    if (result.stdout.includes('EXISTS')) {
      webRoot = dir;
      console.log(`Found web root: ${webRoot}`);
      break;
    }
  }

  if (!webRoot) {
    console.log('Could not auto-detect web root, using /var/www/html');
    webRoot = '/var/www/html';
  }

  if (!fs.existsSync(LOCAL_ZIP)) {
    console.error(`Local file not found: ${LOCAL_ZIP}`);
    conn.end();
    return;
  }

  const stats = fs.statSync(LOCAL_ZIP);
  console.log(`Uploading ${LOCAL_ZIP} (${(stats.size / 1024 / 1024).toFixed(1)}MB) to ${REMOTE_ZIP}...`);

  await uploadFile(LOCAL_ZIP, REMOTE_ZIP);
  console.log('Upload complete');

  console.log(`Unzipping to ${webRoot}...`);
  const unzipResult = await execCommand(`unzip -o ${REMOTE_ZIP} -d ${webRoot}`);
  console.log(unzipResult.stdout);
  if (unzipResult.stderr) console.error(unzipResult.stderr);

  await execCommand(`rm -f ${REMOTE_ZIP}`);
  console.log('Cleaned up remote zip');

  await execCommand(`chown -R www-data:www-data ${webRoot} 2>/dev/null || chown -R nginx:nginx ${webRoot} 2>/dev/null || true`);
  console.log('Deployment complete!');

  conn.end();
});

conn.on('error', (err) => {
  console.error('SSH error:', err.message);
  process.exit(1);
});

conn.connect({
  host: HOST,
  username: USER,
  password: PASS,
  readyTimeout: 30000,
  keepaliveInterval: 5000,
  keepaliveCountMax: 12,
});
