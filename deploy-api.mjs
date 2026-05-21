import fs from 'fs';
import https from 'https';

const API_TOKEN = 'qvF1nUibg50RAm2bfwzlKHRZkz7joaU5wfjq0nZO95b65f82';
const DOMAIN = 'anyhavejewelry.com';
const USERNAME = 'u319294541';
const BASE_URL = 'https://developers.hostinger.com';
const FILE_PATH = 'anyhave-site-noui.zip';
const ARCHIVE_NAME = 'anyhave-site-noui.zip';

function request(url, options, body = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, { ...options, timeout: 30000 }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Request timeout')); });
    if (body) req.write(body);
    req.end();
  });
}

async function retry(fn, retries = 3, delay = 3000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      console.log(`  Attempt ${i + 1} failed: ${err.message}`);
      if (i < retries - 1) {
        console.log(`  Retrying in ${delay / 1000}s...`);
        await new Promise(r => setTimeout(r, delay));
      } else {
        throw err;
      }
    }
  }
}

async function uploadWithStream(patchUrl, auth, authRest) {
  return new Promise((resolve, reject) => {
    const fileSize = fs.statSync(FILE_PATH).size;
    const readStream = fs.createReadStream(FILE_PATH);
    let uploaded = 0;
    let lastPct = -1;

    const url = new URL(patchUrl);
    const req = https.request({
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: 'PATCH',
      headers: {
        'X-Auth': auth,
        'X-Auth-Rest': authRest,
        'upload-offset': '0',
        'Content-Type': 'application/offset+octet-stream',
        'Content-Length': fileSize,
      },
      timeout: 300000,
      agent: new https.Agent({ keepAlive: true, maxSockets: 1 }),
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ status: res.statusCode, body: data });
        } else {
          reject(new Error(`Upload failed: ${res.statusCode} ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Upload timeout')); });

    readStream.on('data', (chunk) => {
      uploaded += chunk.length;
      const pct = Math.floor((uploaded / fileSize) * 100);
      if (pct !== lastPct && pct % 10 === 0) {
        lastPct = pct;
        console.log(`  Upload progress: ${pct}% (${(uploaded / 1024 / 1024).toFixed(1)}MB / ${(fileSize / 1024 / 1024).toFixed(1)}MB)`);
      }
    });

    readStream.pipe(req);
  });
}

async function main() {
  console.log('Fetching upload credentials...');
  const credsRes = await retry(async () =>
    request(
      `${BASE_URL}/api/hosting/v1/files/upload-urls`,
      { method: 'POST', headers: { 'Authorization': `Bearer ${API_TOKEN}`, 'Content-Type': 'application/json' } },
      JSON.stringify({ username: USERNAME, domain: DOMAIN })
    )
  );

  if (credsRes.status !== 200) {
    throw new Error(`Failed to get credentials: ${credsRes.status} ${credsRes.body}`);
  }

  const creds = JSON.parse(credsRes.body);
  const uploadBase = creds.url.replace(/\/$/, '');
  const auth = creds.auth_key;
  const authRest = creds.rest_auth_key;
  console.log(`Upload base: ${uploadBase}`);

  console.log('Creating upload resource...');
  const createRes = await retry(async () =>
    request(
      `${uploadBase}/${ARCHIVE_NAME}?override=true`,
      { method: 'POST', headers: { 'X-Auth': auth, 'X-Auth-Rest': authRest, 'upload-length': String(fs.statSync(FILE_PATH).size) } }
    )
  );

  if (createRes.status !== 201 && createRes.status !== 200) {
    throw new Error(`Failed to create resource: ${createRes.status} ${createRes.body}`);
  }

  let location = createRes.headers.location || `${uploadBase}/${ARCHIVE_NAME}`;
  if (!location.startsWith('http')) {
    location = new URL(location, uploadBase).href;
  }
  console.log(`Resource created, Location: ${location}`);

  console.log(`Uploading ${ARCHIVE_NAME} (${(fs.statSync(FILE_PATH).size / 1024 / 1024).toFixed(1)}MB)...`);
  await retry(async () => uploadWithStream(location, auth, authRest), 3, 5000);
  console.log('Upload successful!');

  console.log('Triggering deployment...');
  const deployRes = await retry(async () =>
    request(
      `${BASE_URL}/api/hosting/v1/accounts/${USERNAME}/websites/${DOMAIN}/deploy`,
      { method: 'POST', headers: { 'Authorization': `Bearer ${API_TOKEN}`, 'Content-Type': 'application/json' } },
      JSON.stringify({ archive_path: ARCHIVE_NAME })
    )
  );

  const deployResult = JSON.parse(deployRes.body);
  console.log(`Deploy triggered: ${deployResult.message || deployRes.body}`);
}

main().catch(err => {
  console.error('Deploy failed:', err.message);
  process.exit(1);
});
