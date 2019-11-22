/**
 * Dependencies
 */

const fs = require('fs');
const path = require('path');
const systemctl = require('../helpers/systemctl');
const loginctl = require('../helpers/loginctl');
const hostnamectl = require('../helpers/hostnamectl');
const localectl = require('../helpers/localectl');
const bootctl = require('../helpers/bootctl');
const timedatectl = require('../helpers/timedatectl');
const pactl = require('../helpers/pactl');
const busctl = require('../helpers/busctl');
const udisksctl = require('../helpers/udisksctl');
const log = require('../helpers/log');

/**
 * Constants
 */

const ETC_DIR  = '/etc/systemd/system';

/**
 * Define and export resolvers
 */

exports.setDefault = (parent, args, context) => {
  const result = systemctl(['set-default', args.pattern]);

  context.pubsub.publish(context.events.SET_DEFAULT, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'SET_DEFAULT',
      args: {
        pattern: args.pattern,
      },
      status: result.status
    })
  });

  return result.status;
};

exports.startUnit = (parent, args, context) => {
  const result = systemctl(['start', args.pattern]);

  context.pubsub.publish(context.events.START_UNIT, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'START_UNIT',
      args: {
        pattern: args.pattern,
      },
      status: result.status
    })
  });

  return result.status;
};

exports.stopUnit = (parent, args, context) => {
  const result = systemctl(['stop', args.pattern]);

  context.pubsub.publish(context.events.STOP_UNIT, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'STOP_UNIT',
      args: {
        pattern: args.pattern,
      },
      status: result.status
    })
  });

  return result.status;
};

exports.reloadUnit = (parent, args, context) => {
  const result = systemctl(['reload', args.pattern]);

  context.pubsub.publish(context.events.RELOAD_UNIT, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'RELOAD_UNIT',
      args: {
        pattern: args.pattern,
      },
      status: result.status
    })
  });

  return result.status;
};

exports.restartUnit = (parent, args, context) => {
  const result = systemctl(['restart', args.pattern]);
  log(context, 'RESTART_UNIT', args, result.status);
  return result.status;
};

exports.tryRestartUnit = (parent, args, context) => {
  const result = systemctl(['try-restart', args.pattern]);
  log(context, 'TRY_RESTART_UNIT', args, result.status);
  return result.status;
};

exports.reloadOrRestartUnit = (parent, args, context) => {
  const result = systemctl(['reload-or-restart', args.pattern]);
  log(context, 'RELOAD_OR_RESTART_UNIT', args, result.status);
  return result.status;
};

exports.tryReloadOrRestartUnit = (parent, args, context) => {
  const result = systemctl(['try-reload-or-restart', args.pattern]);
  log(context, 'TRY_RELOAD_OR_RESTART_UNIT', args, result.status);
  return result.status;
};

exports.poweroff = (parent, args, context) => {
  const result = systemctl(['poweroff']);
  log(context, 'POWEROFF', args, result.status);
  return result.status;
}
exports.halt = (parent, args, context) => {
  const result = systemctl(['halt']);
  log(context, 'HALT', args, result.status);
  return result.status;
}
exports.reboot = (parent, args, context) => {
  const result = systemctl(['reboot']);
  log(context, 'REBOOT', args, result.status);
  return result.status;
}
exports.suspend = (parent, args, context) => {
  const result = systemctl(['suspend']);
  log(context, 'SUSPEND', args, result.status);
  return result.status;
}
exports.hibernate = (parent, args, context) => {
  const result = systemctl(['hibernate']);
  log(context, 'HIBERNATE', args, result.status);
  return result.status;
}
exports.hybridSleep = (parent, args, context) => {
  const result = systemctl(['hybrid-sleep']);
  log(context, 'HYBRID_SLEEP', args, result.status);
  return result.status;
}
exports.daemonReload = (parent, args, context) => {
  const result = systemctl(['daemon-reload']);
  log(context, 'DAEMON_RELOAD', args, result.status);
  return result.status;
}

exports.enableUnit = (parent, args, context) => {
  const result = systemctl(['enable', args.pattern])
  log(context, 'ENABLE', args, result.status);
  return result.status;
};

exports.reenableUnit = (parent, args, context) => {
  const result = systemctl(['reenable', args.pattern])
  log(context, 'REENABLE', args, result.status);
  return result.status;
};

exports.disableUnit = (parent, args, context) => {
  const result = systemctl(['disable', args.pattern])
  log(context, 'DISABLE', args, result.status);
  return result.status;
};

exports.maskUnit = (parent, args, context) => {
  const result = systemctl(['mask', args.pattern])
  log(context, 'MASK', args, result.status);
  return result.status;
};

exports.unmaskUnit = (parent, args, context) => {
  const result = systemctl(['unmask', args.pattern])
  log(context, 'UNMASK', args, result.status);
  return result.status;
};

exports.presetUnit = (parent, args, context) => {
  const result = systemctl(['preset', args.pattern])
  log(context, 'PRESET', args, result.status);
  return result.status;
};

exports.presetAll = (parent, args, context) => {
  const result = systemctl(['preset-all']);
  log(context, 'PRESET_ALL', args, result.status);
  return result.status;
};

exports.revertUnit = (parent, args, context) => {
  const result = systemctl(['revert', args.pattern])
  log(context, 'REVERT', args, result.status);
  return result.status;
};

exports.linkUnit = (parent, args, context) => {
  const result = systemctl(['link', args.path])
  log(context, 'LINK', args, result.status);
  return result.status;
};

exports.addUnit = (parent, args, context) => {
  const unitPath = path.join(ETC_DIR, args.name);
  if (fs.existsSync(unitPath)) return false;

  fs.writeFileSync(unitPath, args.content, { encoding: 'utf8' });
  systemctl(['daemon-reload']);
  log(context, 'ADD_UNIT', args, 0);

  return fs.existsSync(unitPath);
};

exports.editUnit = (parent, args, context) => {
  const unitPath = path.join(ETC_DIR, args.name);
  if (!fs.existsSync(unitPath)) return false;

  fs.writeFileSync(unitPath, args.content, { encoding: 'utf8' });
  systemctl(['daemon-reload']);
  log(context, 'EDIT_UNIT', args, 0);

  return fs.existsSync(unitPath);
};

exports.removeUnit = (parent, args, context) => {
  const unitPath = path.join(ETC_DIR, args.name);
  if (!fs.existsSync(unitPath)) return false;

  fs.unlinkSync(unitPath);
  systemctl(['daemon-reload']);
  log(context, 'REMOVE_UNIT', args, 0);

  return !fs.existsSync(unitPath);
};

exports.lockSession = (parent, args) => {
  const result = loginctl(['lock-session', args.id])
  log(context, 'LOCK_SESSION', args, result.status);
  return result.status;
};

exports.unlockSession = (parent, args) => {
  const result = loginctl(['unlock-session', args.id])
  log(context, 'UNLOCK_SESSION', args, result.status);
  return result.status;
};

exports.terminateSession = (parent, args) => {
  const result = loginctl(['terminate-session', args.id])
  log(context, 'TERMINATE_SESSION', args, result.status);  
  return result.status;
};

exports.terminateUser = (parent, args) => {
  const result = loginctl(['terminate-user', args.uid])
  log(context, 'TERMINATE_USER', args, result.status);  
  return result.status;
};

exports.setHostname = (parent, args) => {
  const result = hostnamectl(['set-hostname', args.name])
  log(context, 'SET_HOSTNAME', args, result.status);
  return result.status;
};

exports.setIconName = (parent, args) => {
  const result = hostnamectl(['set-icon-name', args.name])
  log(context, 'SET_ICON_NAME', args, result.status);
  return result.status;
};

exports.setChassis = (parent, args) => {
  const result = hostnamectl(['set-chassis', args.name.toLowerCase()])
  log(context, 'SET_CHASSIS', args, result.status);
  return result.status;
};

exports.setDeploymentEnv = (parent, args) => {
  const result = hostnamectl(['set-deployment', args.name])
  log(context, 'SET_DEPLOYMENT', args, result.status);
  return result.status;
};

exports.setLocation = (parent, args) => {
  const result = hostnamectl(['set-location', args.name])
  log(context, 'SET_LOCATION', args, result.status);
  return result.status;
};

exports.setLocale = (parent, args) => {
  const result = localectl(['set-locale', args.name])
  log(context, 'SET_LOCALE', args, result.status);
  return result.status;
};

exports.setKeymap = (parent, args) => {
  const result = localectl(['set-keymap', args.name])
  log(context, 'SET_KEYMAP', args, result.status);  
  return result.status;
};

exports.setX11Keymap = (parent, args) => {
  const result = localectl(['set-x11-keymap', args.name])
  log(context, 'SET_X11_KEYMAP', args, result.status);
  return result.status;
};

exports.updateBootLoader = (parent, args) => {
  const result = bootctl(['update'])
  log(context, 'UPDATE_BOOT_LOADER', args, result.status);
  return result.status;
};

exports.installBootLoader = (parent, args) => {
  const result = bootctl(['install'])
  log(context, 'INSTALL_BOOT_LOADER', args, result.status);
  return result.status;
};

exports.removeBootLoader = (parent, args) => {
  const result = bootctl(['remove'])
  log(context, 'REMOVE_BOOT_LOADER', args, result.status);
  return result.status;
};

exports.setTimezone = (parent, args) => {
  const result = timedatectl(['set-timezone', args.timezone])
  log(context, 'SET_TIMEZONE', args, result.status);
  return result.status;
};

exports.setTime = (parent, args) => {
  const result = timedatectl(['set-time', args.time])
  log(context, 'SET_TIME', args, result.status);
  return result.status;
};

exports.uploadAudioSample = (parent, args) => {
  const result = pactl(['upload-sample', args.filename])
  log(context, 'UPLOAD_SAMPLE', args, result.status);
  return result.status;
};

exports.playAudioSample = (parent, args) => {
  const result = pactl(['play-sample', args.name])
  log(context, 'PLAY_AUDIO_SAMPLE', args, result.status);
  return result.status;
};

exports.removeAudioSample = (parent, args) => {
  const result = pactl(['remove-sample', args.name])
  log(context, 'REMOVE_AUDIO_SAMPLE', args, result.status);
  return result.status;
};

exports.mountDisk = (parent, args) => {
  const result = udisksctl([
    'mount',
    '--block-device',
    args.device,
    '--no-user-interaction'
  ]);
  log(context, 'MOUNT_DISK', args, result.status);

  return result.status;
};

exports.unmountDisk = (parent, args) => {
  const result = udisksctl([
    'unmount',
    '--block-device',
    args.device,
    '--no-user-interaction'
  ]);
  log(context, 'UNMOUNT_DISK', args, result.status);
  
  return result.status;
};

exports.lockDisk = (parent, args) => {
  const result = udisksctl([
    'lock',
    '--block-device',
    args.device,
    '--no-user-interaction'
  ]);
  log(context, 'LOCK_DISK', args, result.status);

  return result.status;
};

exports.unlockDisk = (parent, args) => {
  const result = udisksctl([
    'unlock',
    '--block-device',
    args.device,
    '--key-file',
    args.keyFile,
    '--no-user-interaction'
  ]);
  log(context, 'UNLOCK_DISK', args, result.status);

  return result.status;
};
