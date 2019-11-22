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

  context.pubsub.publish(context.events.RESTART_UNIT, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'RESTART_UNIT',
      args: {
        pattern: args.pattern,
      },
      status: result.status
    })
  });

  return result.status;
};

exports.tryRestartUnit = (parent, args, context) => {
  const result = systemctl(['try-restart', args.pattern]);

  context.pubsub.publish(context.events.TRY_RESTART_UNIT, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'TRY_RESTART_UNIT',
      args: {
        pattern: args.pattern,
      },
      status: result.status
    })
  });

  return result.status;
};

exports.reloadOrRestartUnit = (parent, args, context) => {
  const result = systemctl(['reload-or-restart', args.pattern]);

  context.pubsub.publish(context.events.RELOAD_OR_RESTART_UNIT, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'RELOAD_OR_RESTART_UNIT',
      args: {
        pattern: args.pattern,
      },
      status: result.status
    })
  });

  return result.status;
};

exports.tryReloadOrRestartUnit = (parent, args, context) => {
  const result = systemctl(['try-reload-or-restart', args.pattern]);

  context.pubsub.publish(context.events.TRY_RELOAD_OR_RESTART_UNIT, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'TRY_RELOAD_OR_RESTART_UNIT',
      args: {
        pattern: args.pattern,
      },
      status: result.status
    })
  });

  return result.status;
};

exports.poweroff = (parent, args, context) => {
  const result = systemctl(['poweroff']);

  context.pubsub.publish(context.events.POWEROFF, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'POWEROFF',
      status: result.status
    })
  });

  return result.status;
}
exports.halt = (parent, args, context) => {
  const result = systemctl(['halt']);

  context.pubsub.publish(context.events.HALT, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'HALT',
      status: result.status
    })
  });

  return result.status;
}
exports.reboot = (parent, args, context) => {
  const result = systemctl(['reboot']);

  context.pubsub.publish(context.events.REBOOT, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'REBOOT',
      status: result.status
    })
  });

  return result.status;
}
exports.suspend = (parent, args, context) => {
  const result = systemctl(['suspend']);

  context.pubsub.publish(context.events.SUSPEND, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'SUSPEND',
      status: result.status
    })
  });

  return result.status;
}
exports.hibernate = (parent, args, context) => {
  const result = systemctl(['hibernate']);

  context.pubsub.publish(context.events.HIBERNATE, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'HIBERNATE',
      status: result.status
    })
  });

  return result.status;
}
exports.hybridSleep = (parent, args, context) => {
  const result = systemctl(['hybrid-sleep']);

  context.pubsub.publish(context.events.HYBRID_SLEEP, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'HYBRID_SLEEP',
      status: result.status
    })
  });

  return result.status;
}
exports.daemonReload = (parent, args, context) => {
  const result = systemctl(['daemon-reload']);

  context.pubsub.publish(context.events.DAEMON_RELOAD, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'DAEMON_RELOAD',
      status: result.status
    })
  });

  return result.status;
}

exports.enableUnit = (parent, args, context) => {
  const result = systemctl(['enable', args.pattern])

  context.pubsub.publish(context.events.ENABLE, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'ENABLE',
      args: {
        pattern: args.pattern,
      },
      status: result.status
    })
  });

  return result.status;
};

exports.reenableUnit = (parent, args, context) => {
  const result = systemctl(['reenable', args.pattern])

  context.pubsub.publish(context.events.REENABLE, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'REENABLE',
      args: {
        pattern: args.pattern,
      },
      status: result.status
    })
  });

  return result.status;
};

exports.disableUnit = (parent, args, context) => {
  const result = systemctl(['disable', args.pattern])

  context.pubsub.publish(context.events.DISABLE, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'DISABLE',
      args: {
        pattern: args.pattern,
      },
      status: result.status
    })
  });

  return result.status;
};

exports.maskUnit = (parent, args, context) => {
  const result = systemctl(['mask', args.pattern])

  context.pubsub.publish(context.events.MASK, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'MASK',
      args: {
        pattern: args.pattern,
      },
      status: result.status
    })
  });

  return result.status;
};

exports.unmaskUnit = (parent, args, context) => {
  const result = systemctl(['unmask', args.pattern])

  context.pubsub.publish(context.events.UNMASK, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'UNMASK',
      args: {
        pattern: args.pattern,
      },
      status: result.status
    })
  });

  return result.status;
};

exports.presetUnit = (parent, args, context) => {
  const result = systemctl(['preset', args.pattern])

  context.pubsub.publish(context.events.PRESET, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'PRESET',
      args: {
        pattern: args.pattern,
      },
      status: result.status
    })
  });

  return result.status;
};

exports.presetAll = (parent, args, context) => {
  const result = systemctl(['preset-all']);

  context.pubsub.publish(context.events.PRESET_ALL, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'PRESET_ALL',
      status: result.status
    })
  });
  
  return result.status;
};

exports.revertUnit = (parent, args, context) => {
  const result = systemctl(['revert', args.pattern])

  context.pubsub.publish(context.events.REVERT, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'REVERT',
      args: {
        pattern: args.pattern,
      },
      status: result.status
    })
  });

  return result.status;
};

exports.linkUnit = (parent, args, context) => {
  const result = systemctl(['link', args.path])

  context.pubsub.publish(context.events.LINK, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'LINK',
      args: {
        path: args.path,
      },
      status: result.status
    })
  });

  return result.status;
};

exports.addUnit = (parent, args, context) => {
  const unitPath = path.join(ETC_DIR, args.name);
  if (fs.existsSync(unitPath)) return false;

  fs.writeFileSync(unitPath, args.content, { encoding: 'utf8' });
  systemctl(['daemon-reload']);

  context.pubsub.publish(context.events.ADD_UNIT, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'ADD_UNIT',
      args: {
        name: args.name,
        content: args.content,
      },
      status: 0
    })
  });

  return fs.existsSync(unitPath);
};

exports.editUnit = (parent, args, context) => {
  const unitPath = path.join(ETC_DIR, args.name);
  if (!fs.existsSync(unitPath)) return false;

  fs.writeFileSync(unitPath, args.content, { encoding: 'utf8' });
  systemctl(['daemon-reload']);

  context.pubsub.publish(context.events.EDIT_UNIT, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'EDIT_UNIT',
      args: {
        name: args.name,
        content: args.content,
      },
      status: 0
    })
  });

  return fs.existsSync(unitPath);
};

exports.removeUnit = (parent, args, context) => {
  const unitPath = path.join(ETC_DIR, args.name);
  if (!fs.existsSync(unitPath)) return false;

  fs.unlinkSync(unitPath);
  systemctl(['daemon-reload']);

  context.pubsub.publish(context.events.REMOVE_UNIT, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'REMOVE_UNIT',
      args: {
        name: args.name,
      },
      status: 0
    })
  });

  return !fs.existsSync(unitPath);
};

exports.lockSession = (parent, args) => {
  const result = loginctl(['lock-session', args.id])

  context.pubsub.publish(context.events.LOCK_SESSION, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'LOCK_SESSION',
      args: {
        id: args.id,
      },
      status: result.status
    })
  });

  return result.status;
};

exports.unlockSession = (parent, args) => {
  const result = loginctl(['unlock-session', args.id])

  context.pubsub.publish(context.events.UNLOCK_SESSION, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'UNLOCK_SESSION',
      args: {
        id: args.id
      },
      status: result.status
    })
  });
  
  return result.status;
};

exports.terminateSession = (parent, args) => {
  const result = loginctl(['terminate-session', args.id])

  context.pubsub.publish(context.events.TERMINATE_SESSION, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'TERMINATE_SESSION',
      args: {
        id: args.id
      },
      status: result.status
    })
  });
  
  return result.status;
};

exports.terminateUser = (parent, args) => {
  const result = loginctl(['terminate-user', args.uid])

  context.pubsub.publish(context.events.TERMINATE_USER, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'TERMINATE_USER',
      args: {
        uid: args.uid
      },
      status: result.status
    })
  });
  
  return result.status;
};

exports.setHostname = (parent, args) => {
  const result = hostnamectl(['set-hostname', args.name])

  context.pubsub.publish(context.events.SET_HOSTNAME, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'SET_HOSTNAME',
      args: {
        name: args.name
      },
      status: result.status
    })
  });

  return result.status;
};

exports.setIconName = (parent, args) => {
  const result = hostnamectl(['set-icon-name', args.name])
  
  context.pubsub.publish(context.events.SET_ICON_NAME, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'SET_ICON_NAME',
      args: {
        name: args.name
      },
      status: result.status
    })
  });

  return result.status;
};

exports.setChassis = (parent, args) => {
  const result = hostnamectl(['set-chassis', args.name.toLowerCase()])
  
  context.pubsub.publish(context.events.SET_CHASSIS, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'SET_CHASSIS',
      args: {
        name: args.name
      },
      status: result.status
    })
  });

  return result.status;
};

exports.setDeploymentEnv = (parent, args) => {
  const result = hostnamectl(['set-deployment', args.name])
  
  context.pubsub.publish(context.events.SET_DEPLOYMENT, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'SET_DEPLOYMENT',
      args: {
        name: args.name
      },
      status: result.status
    })
  });

  return result.status;
};

exports.setLocation = (parent, args) => {
  const result = hostnamectl(['set-location', args.name])

  context.pubsub.publish(context.events.SET_LOCATION, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'SET_LOCATION',
      args: {
        name: args.name
      },
      status: result.status
    })
  });
  
  return result.status;
};

exports.setLocale = (parent, args) => {
  const result = localectl(['set-locale', args.name])
  
  context.pubsub.publish(context.events.SET_LOCALE, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'SET_LOCALE',
      args: {
        name: args.name
      },
      status: result.status
    })
  });

  return result.status;
};

exports.setKeymap = (parent, args) => {
  const result = localectl(['set-keymap', args.name])

  context.pubsub.publish(context.events.SET_KEYMAP, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'SET_KEYMAP',
      args: {
        name: args.name
      },
      status: result.status
    })
  });
  
  return result.status;
};

exports.setX11Keymap = (parent, args) => {
  const result = localectl(['set-x11-keymap', args.name])

  context.pubsub.publish(context.events.SET_X11_KEYMAP, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'SET_X11_KEYMAP',
      args: {
        name: args.name
      },
      status: result.status
    })
  });
  
  return result.status;
};

exports.updateBootLoader = (parent, args) => {
  const result = bootctl(['update'])
  
  context.pubsub.publish(context.events.UPDATE_BOOT_LOADER, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'UPDATE_BOOT_LOADER',
      status: result.status
    })
  });

  return result.status;
};

exports.installBootLoader = (parent, args) => {
  const result = bootctl(['install'])
  
  context.pubsub.publish(context.events.INSTALL_BOOT_LOADER, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'INSTALL_BOOT_LOADER',
      status: result.status
    })
  });

  return result.status;
};

exports.removeBootLoader = (parent, args) => {
  const result = bootctl(['remove'])
  
  context.pubsub.publish(context.events.REMOVE_BOOT_LOADER, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'REMOVE_BOOT_LOADER',
      status: result.status
    })
  });

  return result.status;
};

exports.setTimezone = (parent, args) => {
  const result = timedatectl(['set-timezone', args.timezone])
  
  context.pubsub.publish(context.events.SET_TIMEZONE, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'SET_TIMEZONE',
      args: {
        timezone: args.timezone
      },
      status: result.status
    })
  });

  return result.status;
};

exports.setTime = (parent, args) => {
  const result = timedatectl(['set-time', args.time])
  
  context.pubsub.publish(context.events.SET_TIME, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'SET_TIME',
      args: {
        time: args.time
      },
      status: result.status
    })
  });

  return result.status;
};

exports.uploadAudioSample = (parent, args) => {
  const result = pactl(['upload-sample', args.filename])
  
  context.pubsub.publish(context.events.UPLOAD_SAMPLE, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'UPLOAD_SAMPLE',
      args: {
        filename: args.filename
      },
      status: result.status
    })
  });

  return result.status;
};

exports.playAudioSample = (parent, args) => {
  const result = pactl(['play-sample', args.name])
  
  context.pubsub.publish(context.events.PLAY_AUDIO_SAMPLE, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'PLAY_AUDIO_SAMPLE',
      args: {
        name: args.name
      },
      status: result.status
    })
  });

  return result.status;
};

exports.removeAudioSample = (parent, args) => {
  const result = pactl(['remove-sample', args.name])
  
  context.pubsub.publish(context.events.REMOVE_AUDIO_SAMPLE, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'REMOVE_AUDIO_SAMPLE',
      args: {
        name: args.name
      },
      status: result.status
    })
  });

  return result.status;
};

exports.mountDisk = (parent, args) => {
  const result = udisksctl([
    'mount',
    '--block-device',
    args.device,
    '--no-user-interaction'
  ]);

  context.pubsub.publish(context.events.REMOVE_AUDIO_SAMPLE, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'MOUNT_DISK',
      args: {
        device: args.device
      },
      status: result.status
    })
  });

  return result.status;
};

exports.unmountDisk = (parent, args) => {
  const result = udisksctl([
    'unmount',
    '--block-device',
    args.device,
    '--no-user-interaction'
  ]);

  context.pubsub.publish(context.events.UNMOUNT_DISK, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'UNMOUNT_DISK',
      args: {
        device: args.device
      },
      status: result.status
    })
  });

  return result.status;
};

exports.lockDisk = (parent, args) => {
  const result = udisksctl([
    'lock',
    '--block-device',
    args.device,
    '--no-user-interaction'
  ]);

  context.pubsub.publish(context.events.LOCK_DISK, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'LOCK_DISK',
      args: {
        device: args.device
      },
      status: result.status
    })
  });

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

  context.pubsub.publish(context.events.UNLOCK_DISK, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'UNLOCK_DISK',
      args: {
        device: args.device,
        keyFile: args.keyFile
      },
      status: result.status
    })
  });

  return result.status;
};
