/**
 * Dependencies
 */

const fs = require('fs');
const path = require('path');
const systemctl = require('../helpers/systemctl');
const loginctl = require('../helpers/loginctl');
const hostnamectl = require('../helpers/hostnamectl');
const localectl = require('../helpers/localectl');

/**
 * Constants
 */

const ETC_DIR  = '/etc/systemd/system';

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

exports.addUnit = (parent, args) => {
  const unitPath = path.join(ETC_DIR, args.name);
  if (fs.existsSync(unitPath)) return false;

  fs.writeFileSync(unitPath, args.content, { encoding: 'utf8' });
  systemctl(['daemon-reload']);

  return fs.existsSync(unitPath);
};

exports.editUnit = (parent, args) => {
  const unitPath = path.join(ETC_DIR, args.name);
  if (!fs.existsSync(unitPath)) return false;

  fs.writeFileSync(unitPath, args.content, { encoding: 'utf8' });
  systemctl(['daemon-reload']);

  return fs.existsSync(unitPath);
};

exports.removeUnit = (parent, args) => {
  const unitPath = path.join(ETC_DIR, args.name);
  if (!fs.existsSync(unitPath)) return false;

  fs.unlinkSync(unitPath);
  systemctl(['daemon-reload']);

  return !fs.existsSync(unitPath);
};

exports.lockSession = (parent, args) => {
  return loginctl(['lock-session', args.id]).status;
};

exports.unlockSession = (parent, args) => {
  return loginctl(['unlock-session', args.id]).status;
};

exports.terminateSession = (parent, args) => {
  return loginctl(['terminate-session', args.id]).status;
};

exports.terminateUser = (parent, args) => {
  return loginctl(['terminate-user', args.uid]).status;
};

exports.setHostname = (parent, args) => {
  return hostnamectl(['set-hostname', args.name]).status;
};

exports.setIconName = (parent, args) => {
  return hostnamectl(['set-icon-name', args.name]).status;
};

exports.setChassis = (parent, args) => {
  return hostnamectl(['set-chassis', args.name.toLowerCase()]).status;
};

exports.setDeploymentEnv = (parent, args) => {
  return hostnamectl(['set-deployment', args.name]).status;
};

exports.setLocation = (parent, args) => {
  return hostnamectl(['set-location', args.name]).status;
};

exports.setLocale = (parent, args) => {
  return localectl(['set-locale', args.name]).status;
};

exports.setKeymap = (parent, args) => {
  return localectl(['set-keymap', args.name]).status;
};

exports.setX11Keymap = (parent, args) => {
  return localectl(['set-x11-keymap', args.name]).status;
};
