import { Client } from 'ssh2';
import fs from 'fs';

const HOST = '31.220.57.114';
const USER = 'root';
const PASS = 'Gsh19841108@@';
const LOCAL_TAR = 'deploy.tar.gz';
const REMOTE_TAR = '/root/deploy.tar.gz';

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

  const webRoot = '/var/www/html';

  if (!fs.existsSync(LOCAL_TAR)) {
    console.error(`Local file not found: ${LOCAL_TAR}`);
    conn.end();
    return;
  }

  const stats = fs.statSync(LOCAL_TAR);
  console.log(`Uploading ${LOCAL_TAR} (${(stats.size / 1024 / 1024).toFixed(1)}MB) to ${REMOTE_TAR}...`);

  await uploadFile(LOCAL_TAR, REMOTE_TAR);
  console.log('Upload complete');

  // Clear web root (backup old index first)
  console.log(`Clearing old files in ${webRoot}...`);
  await execCommand(`rm -rf ${webRoot}/* ${webRoot}/.* 2>/dev/null; ls -la ${webRoot}`);

  // Extract tar.gz
  console.log(`Extracting to ${webRoot}...`);
  const extractResult = await execCommand(`cd ${webRoot} && tar -xzf ${REMOTE_TAR} && ls -la`);
  console.log(extractResult.stdout);
  if (extractResult.stderr) console.error(extractResult.stderr);

  // Clean up remote tar
  await execCommand(`rm -f ${REMOTE_TAR}`);
  console.log('Cleaned up remote tar');

  // Set permissions
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
