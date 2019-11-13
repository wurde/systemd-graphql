/**
 * Dependencies
 */

const child_process = require('child_process');

/**
 * Define and export resolvers
 */

exports.daemonReload = () => {
  const result = child_process.spawnSync(
    'systemctl',
    ['daemon-reload'],
    { encoding: 'utf8' }
  );

  return result.status;
};

exports.setDefault = (parent, args) => {
  const result = child_process.spawnSync(
    'systemctl',
    ['set-default', args.pattern],
    { encoding: 'utf8' }
  );

  return result.status;
};

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

exports.poweroff = () => {
  const result = child_process.spawnSync(
    'systemctl',
    ['poweroff'],
    { encoding: 'utf8' }
  );

  return result.status;
};

exports.halt = () => {
  const result = child_process.spawnSync(
    'systemctl',
    ['halt'],
    { encoding: 'utf8' }
  );

  return result.status;
};

exports.reboot = () => {
  const result = child_process.spawnSync(
    'systemctl',
    ['reboot'],
    { encoding: 'utf8' }
  );

  return result.status;
};

exports.suspend = () => {
  const result = child_process.spawnSync(
    'systemctl',
    ['suspend'],
    { encoding: 'utf8' }
  );

  return result.status;
};

exports.hibernate = () => {
  const result = child_process.spawnSync(
    'systemctl',
    ['hibernate'],
    { encoding: 'utf8' }
  );

  return result.status;
};

exports.hybridSleep = () => {
  const result = child_process.spawnSync(
    'systemctl',
    ['hybrid-sleep'],
    { encoding: 'utf8' }
  );

  return result.status;
};

exports.enable = (parent, args) => {
  const result = child_process.spawnSync(
    'systemctl',
    ['enable', args.pattern],
    { encoding: 'utf8' }
  );

  return result.status;
};
