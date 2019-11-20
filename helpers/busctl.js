/**
 * Dependencies
 */

const child_process = require('child_process');

/**
 * Define helper
 */

function busctl(args) {
  return child_process.spawnSync('busctl', args, {
    encoding: 'utf8'
  });
}

/**
 * Export helper
 */

module.exports = systemctl;
