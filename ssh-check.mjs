import { Client } from 'ssh2';

const conn = new Client();

function exec(cmd) {
  return new Promise((resolve, reject) => {
    conn.exec(cmd, (err, stream) => {
      if (err) return reject(err);
      let out = '';
      stream.on('close', () => resolve(out.trim()));
      stream.on('data', (data) => { out += data; });
    });
  });
}

conn.on('ready', async () => {
  console.log('=== Server tools check ===');
  console.log('tar:', await exec('which tar 2>/dev/null || echo NOT_FOUND'));
  console.log('python3:', await exec('which python3 2>/dev/null || echo NOT_FOUND'));
  console.log('python:', await exec('which python 2>/dev/null || echo NOT_FOUND'));
  console.log('node:', await exec('which node 2>/dev/null || echo NOT_FOUND'));
  console.log('perl:', await exec('which perl 2>/dev/null || echo NOT_FOUND'));
  console.log('zip file:', await exec('ls -la /root/deploy-hostinger.zip 2>/dev/null || echo NOT_FOUND'));
  console.log('web root:', await exec('ls -la /var/www/html/ | head -5'));
  conn.end();
});

conn.connect({
  host: '31.220.57.114',
  username: 'root',
  password: 'Gsh19841108@@',
  keepaliveInterval: 5000,
});
