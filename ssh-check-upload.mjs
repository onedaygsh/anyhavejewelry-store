import { Client } from 'ssh2';

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
  console.log('=== 检查上传服务状态 ===\n');

  // Check if server is running
  const ps = await execCommand('ps aux | grep "upload-server.mjs" | grep -v grep || echo "NOT_RUNNING"');
  console.log('Process:', ps.stdout.trim());

  // Check log
  const log = await execCommand('cat /var/log/upload-server.log 2>/dev/null || echo "NO_LOG"');
  console.log('Log:', log.stdout.trim());

  // Test upload endpoint
  const uploadCheck = await execCommand('curl -s -o /dev/null -w "%{http_code}" -X POST http://127.0.0.1:3001/api/upload 2>/dev/null || echo "000"');
  console.log('Upload endpoint:', uploadCheck.stdout.trim());

  // Check uploads dir
  const uploads = await execCommand('ls -la /var/www/html/uploads 2>/dev/null | head -5 || echo "NO_UPLOADS_DIR"');
  console.log('Uploads dir:', uploads.stdout.trim());

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
