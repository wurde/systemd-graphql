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

exports.isSystemRunning = () => {
  const result = child_process.spawnSync('systemctl', ['is-system-running'], {
    encoding: 'utf8'
  });

  return result.stdout.trim();
};

exports.status = (parent, args) => {
  try {
    const result = child_process.spawnSync(
      'systemctl',
      ['status', args.pattern],
      { encoding: 'utf8' }
    );

    const res = {};
    res['statusCode'] = result.status;

    const lines = result.stdout.split('\n');
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

    return res;
  } catch (e) {
    console.error('e', e);
  }
};

exports.getDefault = () => {
  const result = child_process.spawnSync(
    'systemctl',
    ['get-default'],
    { encoding: 'utf8' }
  );

  return result.stdout.trim();
};

exports.isActive = (parent, args) => {
  const result = child_process.spawnSync(
    'systemctl',
    ['is-active', args.pattern],
    { encoding: 'utf8' }
  );
  
  return result.status;
};

exports.isFailed = (parent, args) => {
  const result = child_process.spawnSync(
    'systemctl',
    ['is-failed', args.pattern],
    { encoding: 'utf8' }
  );

  return result.status;
};

exports.isEnabled = (parent, args) => {
  const result = child_process.spawnSync(
    'systemctl',
    ['is-enabled', args.pattern],
    { encoding: 'utf8' }
  );

  return result.status;
};

exports.units = (parent, args) => {
  const result = child_process.spawnSync(
    'systemctl',
    ['list-units', '--full', '--plain', '--no-legend', '--no-pager'],
    { encoding: 'utf8' }
  );

  const units = result.stdout.split('\n').map(unitLine => {
    return unitLine.split(/\s+/);
  });
  console.log('units', units);

  return [];
};
