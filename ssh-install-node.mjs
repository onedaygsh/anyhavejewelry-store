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
  console.log('=== 在 VPS 上安装 Node.js ===\n');

  console.log('1. 检查现有 Node.js...');
  const check = await execCommand('node --version 2>/dev/null || echo "NOT_FOUND"');
  if (!check.stdout.includes('NOT_FOUND')) {
    console.log('Node.js 已存在:', check.stdout.trim());
    conn.end();
    return;
  }

  console.log('2. 安装 Node.js 24.x...');
  const install = await execCommand(`
    curl -fsSL https://deb.nodesource.com/setup_24.x | bash - && \
    apt-get install -y nodejs 2>&1
  `);
  console.log(install.stdout);
  if (install.stderr) console.error(install.stderr);

  console.log('3. 验证安装...');
  const verify = await execCommand('node --version && npm --version');
  console.log(verify.stdout);

  console.log('\n✅ Node.js 安装完成！');
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
