/**
 * Dependencies
 */

const systemctl = require('../helpers/systemctl');

/**
 * Define and export resolvers
 */

exports.setDefault = (parent, args) => {
  return systemctl(['set-default', args.pattern]).status;
};

exports.start = (parent, args) => {
  return systemctl(['start', args.pattern]).status;
};

exports.stop = (parent, args) => {
  return systemctl(['stop', args.pattern]).status;
};

exports.reload = (parent, args) => {
  return systemctl(['reload', args.pattern]).status;
};

exports.restart = (parent, args) => {
  return systemctl(['restart', args.pattern]).status;
};

exports.tryRestart = (parent, args) => {
  return systemctl(['try-restart', args.pattern]).status;
};

exports.reloadOrRestart = (parent, args) => {
  return systemctl(['reload-or-restart', args.pattern]).status;
};

exports.tryReloadOrRestart = (parent, args) => {
  return systemctl(['try-reload-or-restart', args.pattern]).status;
};

exports.poweroff = () => systemctl(['poweroff']).status;
exports.halt = () => systemctl(['halt']).status;
exports.reboot = () => systemctl(['reboot']).status;
exports.suspend = () => systemctl(['suspend']).status;
exports.hibernate = () => systemctl(['hibernate']).status;
exports.hybridSleep = () => systemctl(['hybrid-sleep']).status;
exports.daemonReload = () => systemctl(['daemon-reload']).status;

exports.enable = (parent, args) => {
  return systemctl(['enable', args.pattern]).status;
};

exports.reenable = (parent, args) => {
  return systemctl(['reenable', args.pattern]).status;
};

exports.disable = (parent, args) => {
  return systemctl(['disable', args.pattern]).status;
};

exports.mask = (parent, args) => {
  return systemctl(['mask', args.pattern]).status;
};

exports.unmask = (parent, args) => {
  return systemctl(['unmask', args.pattern]).status;
};

exports.preset = (parent, args) => {
  return systemctl(['preset', args.pattern]).status;
};

exports.presetAll = (parent, args) => systemctl(['preset-all']).status;

exports.revert = (parent, args) => {
  return systemctl(['revert', args.pattern]).status;
};

exports.link = (parent, args) => {
  return systemctl(['link', args.path]).status;
};
