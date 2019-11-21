/**
 * Dependencies
 */

const child_process = require('child_process');

/**
 * Define helper
 */

function udisksctl(args) {
  return child_process.spawnSync('udisksctl', args, {
    encoding: 'utf8'
  });
}

/**
 * Export helper
 */

module.exports = udisksctl;
