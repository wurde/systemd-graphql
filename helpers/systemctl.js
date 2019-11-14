/**
 * Dependencies
 */

const child_process = require('child_process');

/**
 * Define helper
 */

function systemctl(args) {
  return child_process.spawnSync('systemctl', args, {
    encoding: 'utf8'
  });
}

/**
 * Export helper
 */

module.exports = systemctl;
