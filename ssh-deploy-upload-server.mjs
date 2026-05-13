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

function uploadFile(localPath, remotePath) {
  return new Promise((resolve, reject) => {
    conn.sftp((err, sftp) => {
      if (err) return reject(err);
      const readStream = fs.createReadStream(localPath);
      const writeStream = sftp.createWriteStream(remotePath);
      writeStream.on('close', () => { sftp.end(); resolve(); });
      writeStream.on('error', reject);
      readStream.pipe(writeStream);
    });
  });
}

conn.on('ready', async () => {
  console.log('=== 部署上传服务到 VPS ===\n');

  // 1. Create directory
  console.log('1. 创建上传服务目录...');
  await execCommand('mkdir -p /root/upload-server');

  // 2. Upload server script
  console.log('2. 上传服务脚本...');
  await uploadFile('upload-server.mjs', '/root/upload-server/upload-server.mjs');

  // 3. Install dependencies
  console.log('3. 安装依赖...');
  const install = await execCommand('cd /root/upload-server && npm init -y && npm install express multer cors 2>&1');
  console.log(install.stdout);
  if (install.stderr) console.error(install.stderr);

  // 4. Kill existing process
  console.log('4. 停止旧服务...');
  await execCommand('pkill -f "upload-server.mjs" 2>/dev/null || true');

  // 5. Start server with nohup
  console.log('5. 启动新服务...');
  await execCommand('cd /root/upload-server && nohup node upload-server.mjs > /var/log/upload-server.log 2>&1 &');

  // 6. Verify server is running
  console.log('6. 验证服务状态...');
  await execCommand('sleep 2');
  const check = await execCommand('curl -s http://127.0.0.1:3001/ 2>&1 || echo "not running"');
  console.log(check.stdout);

  // 7. Update nginx config to proxy /api/upload
  console.log('7. 更新 Nginx 配置...');
  const nginxConf = `server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name anyhavejewelry.com www.anyhavejewelry.com;

    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ $uri.html /index.html;
    }

    location /api/upload {
        proxy_pass http://127.0.0.1:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        client_max_body_size 20M;
    }

    location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    error_page 404 /404.html;
}

server {
    server_name anyhavejewelry.com www.anyhavejewelry.com;

    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ $uri.html /index.html;
    }

    location /api/upload {
        proxy_pass http://127.0.0.1:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        client_max_body_size 20M;
    }

    location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    error_page 404 /404.html;

    listen [::]:443 ssl ipv6only=on;
    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/anyhavejewelry.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/anyhavejewelry.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}
`;
  const escaped = nginxConf.replace(/'/g, "'\\''");
  await execCommand(`echo '${escaped}' > /etc/nginx/sites-enabled/default`);

  // 8. Test and reload nginx
  console.log('8. 测试并重载 Nginx...');
  const test = await execCommand('nginx -t 2>&1');
  console.log(test.stdout);
  if (test.stdout.includes('successful')) {
    await execCommand('nginx -s reload 2>&1 || service nginx reload 2>&1');
    console.log('Nginx 已重载');
  } else {
    console.log('Nginx 配置测试失败');
  }

  // 9. Verify upload endpoint
  console.log('9. 验证上传端点...');
  const uploadCheck = await execCommand('curl -s -o /dev/null -w "%{http_code}" -X POST http://127.0.0.1:3001/api/upload 2>&1');
  console.log(`上传服务状态码: ${uploadCheck.stdout.trim()}`);

  console.log('\n✅ 上传服务部署完成！');
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
