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
  console.log('=== 修复 HTTP 重定向 ===\n');

  const newConf = `server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name anyhavejewelry.com www.anyhavejewelry.com;
    return 301 https://$host$request_uri;
}

server {
    server_name anyhavejewelry.com www.anyhavejewelry.com;

    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ $uri.html /index.html;
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

  console.log('写入修复后的配置...');
  const escaped = newConf.replace(/'/g, "'\\''");
  await execCommand(`echo '${escaped}' > /etc/nginx/sites-enabled/default`);

  console.log('测试配置...');
  const test = await execCommand('nginx -t 2>&1');
  console.log(test.stdout);
  if (test.stderr) console.error(test.stderr);

  if (test.stdout.includes('successful')) {
    console.log('重载 Nginx...');
    await execCommand('nginx -s reload 2>&1 || service nginx reload 2>&1');
    console.log('已重载');

    console.log('\n验证访问...');
    const h80 = await execCommand('curl -s -o /dev/null -w "%{http_code}" http://localhost/index.html');
    console.log(`HTTP 80: ${h80.stdout} (应为 301)`);

    const h443 = await execCommand('curl -s -o /dev/null -w "%{http_code}" -k https://localhost/index.html');
    console.log(`HTTPS 443: ${h443.stdout} (应为 200)`);

    console.log('\n✅ 修复完成！');
  } else {
    console.log('\n❌ 配置测试失败');
  }

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
