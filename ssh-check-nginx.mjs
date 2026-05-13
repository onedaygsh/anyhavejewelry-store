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
  console.log('=== 检查 Nginx 当前配置 ===\n');

  const conf = await execCommand('cat /etc/nginx/sites-enabled/default');
  console.log(conf.stdout);

  console.log('\n--- 检查文件是否存在 ---');
  const files = await execCommand('ls -la /var/www/html/index.html /var/www/html/admin/index.html 2>&1');
  console.log(files.stdout);

  console.log('\n--- 测试本地访问 ---');
  const curl80 = await execCommand('curl -s -o /dev/null -w "%{http_code}" http://localhost/index.html');
  console.log('HTTP 80:', curl80.stdout);

  const curl443 = await execCommand('curl -s -o /dev/null -w "%{http_code}" -k https://localhost/index.html');
  console.log('HTTPS 443:', curl443.stdout);

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
