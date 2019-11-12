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
