/**
 * Dependencies
 */

const child_process = require('child_process');

/**
 * Define helper
 */

function systemdAnalyze(args) {
  return child_process.spawnSync('systemd-analyze', args, {
    encoding: 'utf8'
  });
}

/**
 * Export helper
 */

module.exports = systemdAnalyze;
