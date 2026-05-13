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
  console.log('=== Nginx 配置诊断 ===\n');

  // Check which sites are enabled
  console.log('--- 启用的站点配置 ---');
  const sites = await execCommand('ls -la /etc/nginx/sites-enabled/ 2>/dev/null || ls -la /etc/nginx/conf.d/ 2>/dev/null || echo "No sites found"');
  console.log(sites.stdout);

  // Check default nginx config
  console.log('\n--- 默认 Nginx 配置 ---');
  const defaultConf = await execCommand('cat /etc/nginx/sites-enabled/default 2>/dev/null || cat /etc/nginx/conf.d/default.conf 2>/dev/null || echo "No default config"');
  console.log(defaultConf.stdout);

  // Check all server blocks
  console.log('\n--- 所有 server 配置 ---');
  const grepRoot = await execCommand('grep -r "root" /etc/nginx/sites-enabled/ /etc/nginx/conf.d/ 2>/dev/null || echo "No root directives found"');
  console.log(grepRoot.stdout);

  // Check if our files exist
  console.log('\n--- /var/www/html 内容 ---');
  const htmlFiles = await execCommand('ls -la /var/www/html/ | head -20');
  console.log(htmlFiles.stdout);

  // Check nginx error log
  console.log('\n--- Nginx 最近错误日志 ---');
  const errorLog = await execCommand('tail -20 /var/log/nginx/error.log 2>/dev/null || echo "No error log"');
  console.log(errorLog.stdout);

  // Check which config is being used for port 80
  console.log('\n--- 监听 80 端口的配置 ---');
  const listen80 = await execCommand('grep -r "listen 80" /etc/nginx/sites-enabled/ /etc/nginx/conf.d/ /etc/nginx/nginx.conf 2>/dev/null || echo "No listen 80 found"');
  console.log(listen80.stdout);

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
