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
  console.log('=== 检查服务器网络配置 ===\n');

  console.log('--- 公网 IP ---');
  const ip1 = await execCommand('curl -s https://api.ipify.org 2>/dev/null || echo "failed"');
  console.log('ipify:', ip1.stdout.trim());

  const ip2 = await execCommand('curl -s https://ifconfig.me 2>/dev/null || echo "failed"');
  console.log('ifconfig.me:', ip2.stdout.trim());

  console.log('\n--- 本机 IP 地址 ---');
  const localIp = await execCommand('ip addr show | grep "inet " | head -5');
  console.log(localIp.stdout);

  console.log('\n--- Hostname ---');
  const host = await execCommand('hostname -I 2>/dev/null || echo "no hostname"');
  console.log(host.stdout);

  console.log('\n--- Nginx 所有监听端口 ---');
  const listen = await execCommand('grep -r "listen" /etc/nginx/sites-enabled/ /etc/nginx/conf.d/ /etc/nginx/nginx.conf 2>/dev/null | grep -v "#"');
  console.log(listen.stdout || 'No listen directives');

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
