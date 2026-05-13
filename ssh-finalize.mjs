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
  console.log('Connected to server');

  // Fix ownership
  console.log('Fixing file permissions...');
  const permResult = await execCommand('chown -R www-data:www-data /var/www/html && chmod -R 755 /var/www/html');
  if (permResult.stderr) console.error(permResult.stderr);
  else console.log('Permissions fixed');

  // Check nginx config
  console.log('Testing nginx config...');
  const nginxTest = await execCommand('nginx -t 2>&1');
  console.log(nginxTest.stdout);
  if (nginxTest.stderr) console.error(nginxTest.stderr);

  // Reload nginx
  console.log('Reloading nginx...');
  const reloadResult = await execCommand('systemctl reload nginx 2>&1 || service nginx reload 2>&1 || nginx -s reload 2>&1');
  console.log(reloadResult.stdout);
  if (reloadResult.stderr) console.error(reloadResult.stderr);

  // Verify site is serving
  console.log('Verifying site...');
  const curlResult = await execCommand('curl -s -o /dev/null -w "%{http_code}" http://localhost/index.html');
  console.log(`Homepage HTTP status: ${curlResult.stdout}`);

  // Check admin page exists
  const adminResult = await execCommand('curl -s -o /dev/null -w "%{http_code}" http://localhost/admin/index.html');
  console.log(`Admin page HTTP status: ${adminResult.stdout}`);

  console.log('\nDeployment finalized!');
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
