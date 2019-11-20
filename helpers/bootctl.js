/**
 * Dependencies
 */

const child_process = require('child_process');

/**
 * Define helper
 */

function bootctl(args) {
  return child_process.spawnSync('bootctl', args, {
    encoding: 'utf8'
  });
}

/**
 * Export helper
 */

module.exports = systemctl;
