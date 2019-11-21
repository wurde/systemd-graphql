/**
 * Dependencies
 */

const systemctl = require('../helpers/systemctl');
const journalctl = require('../helpers/journalctl');
const loginctl = require('../helpers/loginctl');
const hostnamectl = require('../helpers/hostnamectl');
const unitListParser = require('../helpers/unitListParser');
const systemdAnalyze = require('../helpers/systemdAnalyze');

/**
 * Define and export resolvers
 */

exports.now = () => {
  return new Date().toISOString().slice(0, 10);
};

exports.hi = (parent, args) => {
  return args.message;
};

exports.info = () => {
  return 'This is a GraphQL API for systemd.';
};

exports.version = () => {
  const result = systemctl(['daemon-reload', '--version']);
  return result.match(/\b\d+\b/)[0];
};

exports.isSystemRunning = () => {
  const result = systemctl(['is-system-running']);
  return result.stdout.trim();
};

exports.sessionStatus = (parent, args) => {
  const cmdArgs = ['show-session'];
  if (args.id) {
    cmdArgs.push(args.id);
  }

  let result = loginctl(cmdArgs);

  if (result.status === 0) {
    result = result.stdout
      .trim()
      .split('\n')
      .reduce((obj, line) => {
        const x = line.split('=');
        obj[x[0]] = x[1];
        return obj;
      }, {});
  } else {
    result = null;
  }

  if (result) {
    return JSON.stringify(result);
  } else {
    return null;
  }
};

exports.userStatus = (parent, args) => {
  const cmdArgs = ['show-user'];
  if (args.uid) {
    cmdArgs.push(args.uid);
  } else if (args.name) {
    cmdArgs.push(args.name);
  }

  let result = loginctl(cmdArgs)

  if (result.status === 0) {
    result = result.stdout.trim().split("\n")
    .reduce((obj,line) => {const x = line.split("="); obj[x[0]] = x[1]; return obj}, {});
  } else {
    result = null;
  }

  if (result) {
    return JSON.stringify(result);
  } else {
    return null;
  }
};

exports.unitStatus = (parent, args) => {
  try {
    const result = systemctl(['status', args.pattern]);

    const res = {};
    res['statusCode'] = result.status;

    const lines = result.stdout.split('\n');
    lines.forEach(line => {
      if (line.match(/Loaded/)) {
        res['loadState'] = line.trim().split(' ')[1];
      }
      if (line.match(/Active/)) {
        res['activeState'] = line.trim().split(' ')[1];
      }
      if (line.match(/Main PID/)) {
        res['mainPid'] = line.match(/\b\d+\b/)[0];
      }
    });

    return res;
  } catch (e) {
    console.error('e', e);
  }
};

exports.getDefault = () => {
  return systemctl(['get-default']).stdout.trim();
};

exports.isActive = (parent, args) => {
  return systemctl(['is-active', args.pattern]).status;
};

exports.isFailed = (parent, args) => {
  return systemctl(['is-failed', args.pattern]).status;
};

exports.isEnabled = (parent, args) => {
  return systemctl(['is-enabled', args.pattern]).status;
};

exports.sessions = () => {
  let sessionList = loginctl(['list-sessions', '--no-legend', '--no-pager'])
    .stdout.trim()
    .split('\n').map(line => parseInt(line.split(' ')[0]));

  sessionList = sessionList.map(sessionId => {
    const result = loginctl(['show-session', sessionId])
      .stdout.trim()
      .split('\n')
      .reduce((obj, line) => {
        const x = line.split('=');
        obj[x[0]] = x[1];
        return obj;
      }, {});
    return JSON.stringify(result);
  });

  return sessionList;
};

exports.users = () => {
  let userList = loginctl(['list-users', '--no-legend', '--no-pager'])
    .stdout.trim()
    .split('\n').map(line => parseInt(line.split(' ')[0]));

  userList = userList.map(userId => {
    const result = loginctl(['show-user', userId])
      .stdout.trim()
      .split('\n')
      .reduce((obj, line) => {
        const x = line.split('=');
        obj[x[0]] = x[1];
        return obj;
      }, {});
    return JSON.stringify(result);
  });

  return userList
};

exports.units = () => {
  const result = systemctl([
    'list-units',
    '--full',
    '--plain',
    '--no-legend',
    '--no-pager'
  ]);

  return unitListParser(result.stdout);
};

exports.services = () => {
  const result = systemctl([
    'list-units',
    '--full',
    '--plain',
    '--no-legend',
    '--no-pager',
    '--type=service'
  ]);

  return unitListParser(result.stdout);
};

exports.sockets = () => {
  const result = systemctl([
    'list-units',
    '--full',
    '--plain',
    '--no-legend',
    '--no-pager',
    '--type=socket'
  ]);

  return unitListParser(result.stdout);
};

exports.devices = () => {
  const result = systemctl([
    'list-units',
    '--full',
    '--plain',
    '--no-legend',
    '--no-pager',
    '--type=device'
  ]);
  
  return unitListParser(result.stdout);
};

exports.mounts = () => {
  const result = systemctl([
    'list-units',
    '--full',
    '--plain',
    '--no-legend',
    '--no-pager',
    '--type=mount'
  ]);

  return unitListParser(result.stdout);
};

exports.automounts = () => {
  const result = systemctl([
    'list-units',
    '--full',
    '--plain',
    '--no-legend',
    '--no-pager',
    '--type=automount'
  ]);

  return unitListParser(result.stdout);
};

exports.swaps = () => {
  const result = systemctl([
    'list-units',
    '--full',
    '--plain',
    '--no-legend',
    '--no-pager',
    '--type=swap'
  ]);

  return unitListParser(result.stdout);
};

exports.targets = () => {
  const result = systemctl([
    'list-units',
    '--full',
    '--plain',
    '--no-legend',
    '--no-pager',
    '--type=target'
  ]);

  return unitListParser(result.stdout);
};

exports.paths = () => {
  const result = systemctl([
    'list-units',
    '--full',
    '--plain',
    '--no-legend',
    '--no-pager',
    '--type=path'
  ]);

  return unitListParser(result.stdout);
};

exports.timers = () => {
  const result = systemctl([
    'list-units',
    '--full',
    '--plain',
    '--no-legend',
    '--no-pager',
    '--type=timer'
  ]);

  return unitListParser(result.stdout);
};

exports.slices = () => {
  const result = systemctl([
    'list-units',
    '--full',
    '--plain',
    '--no-legend',
    '--no-pager',
    '--type=slice'
  ]);

  return unitListParser(result.stdout);
};

exports.scopes = () => {
  const result = systemctl([
    'list-units',
    '--full',
    '--plain',
    '--no-legend',
    '--no-pager',
    '--type=scope'
  ]);
  
  return unitListParser(result.stdout);
};

exports.blame = () => {
  const result = systemdAnalyze(['blame']);
  const units = result.stdout.trim().split('\n').map(line => {
    const cols = line.trim().split(/\s+/);
    const timeStr = cols[0];
    const prefix = timeStr.match(/\D+$/)[0];

    /**
     * Convert time to milliseconds.
     */

    let time
    if (prefix === 'ms') {
      time = parseInt(timeStr.replace(/\D/g, ''));
    } else if (prefix === 's') {
      time = parseInt(parseFloat(timeStr.replace(/\D+$/, '')) * 1000);
    }

    return {
      timeToInitialize: time,
      name: cols[1]
    };
  })

  return units;
};

exports.hostname = (parent, args) => {
  let result = hostnamectl(["status"]);

  if (result.status === 0) {
    result = result.stdout
      .trim()
      .split('\n')
      .reduce((obj, line) => {
        const x = line.split(':');
        obj[x[0].trim()] = x[1].trim();
        return obj;
      }, {});
  } else {
    result = null;
  }

  if (result) {
    return JSON.stringify(result);
  } else {
    return null;
  }
};

exports.journal = (parent, args) => {
  const inputArgs = ['--no-pager']

  if (args.unit) {
    inputArgs.push(`--unit=${args.unit}`)
  }
  if (args.since) {
    inputArgs.push(`--since=${args.since}`)
  }
  if (args.lines) {
    inputArgs.push(`--lines=${args.lines}`)
  }
  if (args.output) {
    inputArgs.push(`--output=${args.output.toLowerCase()}`)
  }
  
  const lines = journalctl(inputArgs)
    .stdout.trim()
    .split('\n')
    .filter(line => !line.startsWith('--'));

  return lines;
};
