/**
 * Dependencies
 */

const child_process = require('child_process');

/**
 * Define and export resolvers
 */

exports.start = (parent, args) => {
  const result = child_process.spawnSync(
    'systemctl',
    ['start', args.pattern],
    { encoding: 'utf8' }
  );

  return result.status;
};

exports.stop = (parent, args) => {
  const result = child_process.spawnSync(
    'systemctl',
    ['stop', args.pattern],
    { encoding: 'utf8' }
  );

  return result.status;
};

exports.reload = (parent, args) => {
  const result = child_process.spawnSync(
    'systemctl',
    ['reload', args.pattern],
    { encoding: 'utf8' }
  );

  return result.status;
};

exports.restart = (parent, args) => {
  const result = child_process.spawnSync(
    'systemctl',
    ['restart', args.pattern],
    { encoding: 'utf8' }
  );

  return result.status;
};

exports.tryRestart = (parent, args) => {
  const result = child_process.spawnSync(
    'systemctl',
    ['try-restart', args.pattern],
    { encoding: 'utf8' }
  );

  return result.status;
};

exports.reloadOrRestart = (parent, args) => {
  const result = child_process.spawnSync(
    'systemctl',
    ['reload-or-restart', args.pattern],
    { encoding: 'utf8' }
  );

  return result.status;
};

exports.tryReloadOrRestart = (parent, args) => {
  const result = child_process.spawnSync(
    'systemctl',
    ['try-reload-or-restart', args.pattern],
    { encoding: 'utf8' }
  );

  return result.status;
};
