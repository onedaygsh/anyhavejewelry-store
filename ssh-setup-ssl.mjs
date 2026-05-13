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
  console.log('=== 配置 HTTPS SSL 证书 ===\n');

  // Check if certbot is installed
  console.log('检查 certbot...');
  const certbotCheck = await execCommand('which certbot 2>/dev/null || echo "not found"');
  if (certbotCheck.stdout.trim() === 'not found') {
    console.log('certbot 未安装，正在安装...');
    const install = await execCommand('apt-get update && apt-get install -y certbot python3-certbot-nginx 2>&1');
    if (install.stdout.includes('error') || install.stderr.includes('error')) {
      console.log('尝试通过 snap 安装...');
      await execCommand('snap install --classic certbot 2>&1 || true');
      await execCommand('ln -s /snap/bin/certbot /usr/bin/certbot 2>/dev/null || true');
    }
  } else {
    console.log('certbot 已安装');
  }

  // Check nginx config for server_name
  console.log('\n检查当前 nginx 配置...');
  const nginxConf = await execCommand('cat /etc/nginx/sites-enabled/default');
  console.log(nginxConf.stdout);

  // Update nginx config to include domain name
  if (!nginxConf.stdout.includes('anyhavejewelry.com')) {
    console.log('\n更新 nginx 配置添加域名...');
    const newConf = `server {
    listen 80 default_server;
    listen [::]:80 default_server;
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
}`;
    const escaped = newConf.replace(/'/g, "'\\''");
    await execCommand(`echo '${escaped}' > /etc/nginx/sites-enabled/default`);
    console.log('配置已更新');
  }

  // Test nginx config
  console.log('\n测试 nginx 配置...');
  const test = await execCommand('nginx -t 2>&1');
  console.log(test.stdout);
  if (test.stderr) console.error(test.stderr);

  if (!test.stdout.includes('successful')) {
    console.log('配置测试失败，终止');
    conn.end();
    return;
  }

  await execCommand('nginx -s reload 2>&1 || service nginx reload 2>&1');
  console.log('Nginx 已重载');

  // Obtain SSL certificate
  console.log('\n申请 Let\'s Encrypt 证书...');
  const certResult = await execCommand(
    'certbot --nginx -d anyhavejewelry.com -d www.anyhavejewelry.com --non-interactive --agree-tos --email admin@anyhavejewelry.com 2>&1 || echo "CERT_FAILED"'
  );
  console.log(certResult.stdout);
  if (certResult.stderr) console.error(certResult.stderr);

  if (certResult.stdout.includes('CERT_FAILED')) {
    console.log('\n证书申请失败，可能是 DNS 尚未完全生效。');
    console.log('请等待 10-30 分钟后重试，或手动运行：');
    console.log('  certbot --nginx -d anyhavejewelry.com -d www.anyhavejewelry.com');
  } else if (certResult.stdout.includes('Congratulations') || certResult.stdout.includes('Successfully')) {
    console.log('\nSSL 证书配置成功！');
    console.log('HTTPS 已启用，HTTP 请求将自动跳转到 HTTPS');
  } else {
    console.log('\n证书申请结果不确定，请检查上方输出');
  }

  // Verify
  console.log('\n验证网站访问...');
  const home = await execCommand('curl -s -o /dev/null -w "%{http_code}" http://localhost/index.html');
  console.log(`HTTP 首页状态: ${home.stdout}`);

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
