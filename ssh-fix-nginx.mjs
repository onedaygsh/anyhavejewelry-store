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

const newConfig = `server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

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
}
`;

conn.on('ready', async () => {
  console.log('=== 修复 Nginx 配置 ===\n');

  // Backup old config
  console.log('备份原配置...');
  await execCommand('cp /etc/nginx/sites-enabled/default /etc/nginx/sites-enabled/default.bak.$(date +%s)');
  console.log('备份完成');

  // Write new config
  console.log('\n写入新配置...');
  const escaped = newConfig.replace(/'/g, "'\\''");
  await execCommand(`echo '${escaped}' > /etc/nginx/sites-enabled/default`);
  console.log('配置已写入');

  // Verify config
  console.log('\n测试 Nginx 配置语法...');
  const test = await execCommand('nginx -t 2>&1');
  console.log(test.stdout);
  if (test.stderr) console.error(test.stderr);

  if (test.stdout.includes('successful')) {
    console.log('\n重载 Nginx...');
    const reload = await execCommand('systemctl reload nginx 2>&1 || service nginx reload 2>&1 || nginx -s reload 2>&1');
    console.log(reload.stdout);
    if (reload.stderr) console.error(reload.stderr);

    console.log('\n验证本地访问...');
    const home = await execCommand('curl -s -o /dev/null -w "%{http_code}" http://localhost/index.html');
    console.log(`首页状态: ${home.stdout}`);

    const admin = await execCommand('curl -s -o /dev/null -w "%{http_code}" http://localhost/admin/index.html');
    console.log(`Admin页状态: ${admin.stdout}`);

    console.log('\n✅ Nginx 修复完成！');
  } else {
    console.log('\n❌ 配置测试失败，未重载');
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
