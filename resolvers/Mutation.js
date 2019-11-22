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
      pattern: args.pattern,
      status: result.status
    })
  });

  return result.status;
};

exports.start = (parent, args, context) => {
  const result = systemctl(['start', args.pattern]);

  context.pubsub.publish(context.events.START_UNIT, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'START_UNIT',
      pattern: args.pattern,
      status: result.status
    })
  });

  return result.status;
};

exports.stop = (parent, args, context) => {
  const result = systemctl(['stop', args.pattern]);

  context.pubsub.publish(context.events.STOP_UNIT, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'STOP_UNIT',
      pattern: args.pattern,
      status: result.status
    })
  });

  return result.status;
};

exports.reload = (parent, args, context) => {
  const result = systemctl(['reload', args.pattern]);

  context.pubsub.publish(context.events.RELOAD_UNIT, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'RELOAD_UNIT',
      pattern: args.pattern,
      status: result.status
    })
  });

  return result.status;
};

exports.restart = (parent, args, context) => {
  const result = systemctl(['restart', args.pattern]);

  context.pubsub.publish(context.events.RESTART_UNIT, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'RESTART_UNIT',
      pattern: args.pattern,
      status: result.status
    })
  });

  return result.status;
};

exports.tryRestart = (parent, args, context) => {
  const result = systemctl(['try-restart', args.pattern]);

  context.pubsub.publish(context.events.TRY_RESTART_UNIT, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'TRY_RESTART_UNIT',
      pattern: args.pattern,
      status: result.status
    })
  });

  return result.status;
};

exports.reloadOrRestart = (parent, args, context) => {
  const result = systemctl(['reload-or-restart', args.pattern]);

  context.pubsub.publish(context.events.RELOAD_OR_RESTART_UNIT, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'RELOAD_OR_RESTART_UNIT',
      pattern: args.pattern,
      status: result.status
    })
  });

  return result.status;
};

exports.tryReloadOrRestart = (parent, args, context) => {
  const result = systemctl(['try-reload-or-restart', args.pattern]);

  context.pubsub.publish(context.events.TRY_RELOAD_OR_RESTART_UNIT, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'TRY_RELOAD_OR_RESTART_UNIT',
      pattern: args.pattern,
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

exports.enable = (parent, args, context) => {
  const result = systemctl(['enable', args.pattern])

  context.pubsub.publish(context.events.ENABLE, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'ENABLE',
      pattern: args.pattern,
      status: result.status
    })
  });

  return result.status;
};

exports.reenable = (parent, args, context) => {
  const result = systemctl(['reenable', args.pattern])

  context.pubsub.publish(context.events.REENABLE, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'REENABLE',
      pattern: args.pattern,
      status: result.status
    })
  });

  return result.status;
};

exports.disable = (parent, args, context) => {
  const result = systemctl(['disable', args.pattern])

  context.pubsub.publish(context.events.DISABLE, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'DISABLE',
      pattern: args.pattern,
      status: result.status
    })
  });

  return result.status;
};

exports.mask = (parent, args, context) => {
  const result = systemctl(['mask', args.pattern])

  context.pubsub.publish(context.events.MASK, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'MASK',
      pattern: args.pattern,
      status: result.status
    })
  });

  return result.status;
};

exports.unmask = (parent, args, context) => {
  const result = systemctl(['unmask', args.pattern])

  context.pubsub.publish(context.events.UNMASK, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'UNMASK',
      pattern: args.pattern,
      status: result.status
    })
  });

  return result.status;
};

exports.preset = (parent, args, context) => {
  const result = systemctl(['preset', args.pattern])

  context.pubsub.publish(context.events.PRESET, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'PRESET',
      pattern: args.pattern,
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

exports.revert = (parent, args, context) => {
  const result = systemctl(['revert', args.pattern])

  context.pubsub.publish(context.events.REVERT, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'REVERT',
      pattern: args.pattern,
      status: result.status
    })
  });

  return result.status;
};

exports.link = (parent, args, context) => {
  const result = systemctl(['link', args.path])

  context.pubsub.publish(context.events.LINK, {
    log: JSON.stringify({
      createdAt: new Date(),
      event: 'LINK',
      path: args.path,
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

exports.updateBootLoader = (parent, args) => {
  return bootctl(['update']).status;
};

exports.installBootLoader = (parent, args) => {
  return bootctl(['install']).status;
};

exports.removeBootLoader = (parent, args) => {
  return bootctl(['remove']).status;
};

exports.setTimezone = (parent, args) => {
  return timedatectl(['set-timezone', args.timezone]).status;
};

exports.setTime = (parent, args) => {
  return timedatectl(['set-time', args.time]).status;
};

exports.uploadAudioSample = (parent, args) => {
  return pactl(['upload-sample', args.filename]).status;
};

exports.playAudioSample = (parent, args) => {
  return pactl(['play-sample', args.name]).status;
};

exports.removeAudioSample = (parent, args) => {
  return pactl(['remove-sample', args.name]).status;
};
