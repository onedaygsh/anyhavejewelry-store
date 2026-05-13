import { Client } from 'ssh2';
import fs from 'fs';

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

conn.on('ready', async () => {
  console.log('Connected to VPS');

  const pubKey = fs.readFileSync('deploy_key.pub', 'utf-8').trim();
  console.log('Adding public key to authorized_keys...');

  await execCommand('mkdir -p /root/.ssh && chmod 700 /root/.ssh');

  const check = await execCommand('cat /root/.ssh/authorized_keys 2>/dev/null || echo "NEW_FILE"');
  if (!check.stdout.includes(pubKey)) {
    const escaped = pubKey.replace(/'/g, "'\\''");
    await execCommand(`echo '${escaped}' >> /root/.ssh/authorized_keys`);
    await execCommand('chmod 600 /root/.ssh/authorized_keys');
    console.log('Public key added successfully');
  } else {
    console.log('Public key already exists');
  }

  console.log('\nVerifying SSH key auth...');
  const verify = await execCommand('whoami');
  console.log(`Logged in as: ${verify.stdout.trim()}`);

  conn.end();
});

conn.on('error', (err) => {
  console.error('SSH error:', err.message);
  process.exit(1);
});

conn.connect({
  host: '31.220.57.114',
  username: 'root',
  password: 'Gsh19841108@@',
  keepaliveInterval: 5000,
});
