/**
 * Dependencies
 */

const child_process = require('child_process');

/**
 * Define and export resolvers
 */

exports.info = () => {
  return 'This is a GraphQL API for systemd.';
};

exports.version = () => {
  const result = child_process.execSync('systemctl --version', { encoding: 'utf8' });
  return result.match(/\b\d+\b/)[0];
};

exports.status = (parent, args) => {
  try {
    // const result = child_process.execSync(`systemctl status docker.service`, { encoding: 'utf8' });
    const result = child_process.execSync(`systemctl status ${args.pattern}`, { encoding: 'utf8' });
    const lines = result.split('\n');
    const res = {}
    lines.forEach(line => {
      if (line.match(/Loaded/)) {
        res['loadState'] = line.trim().split(' ')[1];
      }
      if (line.match(/Active/)) {
        res['activeState'] = line.trim().split(' ')[1];
      }
      if (line.match(/Main PID/)) {
        res['mainPid'] = line.match(/\b\d+\b/)[0];
      }
    })
    console.log('res', res)
    return res
  } catch (e) {
    console.error('e', e)
  }
};
