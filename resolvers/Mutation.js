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

exports.poweroff = (parent, args) => {
  const result = child_process.spawnSync(
    'systemctl',
    ['poweroff', args.pattern],
    { encoding: 'utf8' }
  );

  return result.status;
};

exports.halt = (parent, args) => {
  const result = child_process.spawnSync(
    'systemctl',
    ['halt', args.pattern],
    { encoding: 'utf8' }
  );

  return result.status;
};

exports.reboot = (parent, args) => {
  const result = child_process.spawnSync(
    'systemctl',
    ['reboot', args.pattern],
    { encoding: 'utf8' }
  );

  return result.status;
};

exports.suspend = (parent, args) => {
  const result = child_process.spawnSync(
    'systemctl',
    ['suspend', args.pattern],
    { encoding: 'utf8' }
  );

  return result.status;
};

exports.hibernate = (parent, args) => {
  const result = child_process.spawnSync(
    'systemctl',
    ['hibernate', args.pattern],
    { encoding: 'utf8' }
  );

  return result.status;
};

exports.hybridSleep = (parent, args) => {
  const result = child_process.spawnSync(
    'systemctl',
    ['hybrid-sleep', args.pattern],
    { encoding: 'utf8' }
  );

  return result.status;
};
