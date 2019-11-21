/**
 * Dependencies
 */

const child_process = require('child_process');

/**
 * Define helper
 */

function pactl(args) {
  return child_process.spawnSync('pactl', args, {
    encoding: 'utf8'
  });
}

/**
 * Export helper
 */

module.exports = pactl;
