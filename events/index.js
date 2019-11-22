/**
 * Define and export events
 */

module.exports = {
  SET_DEFAULT: 'set_default',
  START_UNIT: 'start_unit',
  STOP_UNIT: 'stop_unit',
  RELOAD_UNIT: 'reload_unit',
  RESTART_UNIT: 'restart_unit',
  TRY_RESTART_UNIT: 'try_restart_unit',
  RELOAD_OR_RESTART_UNIT: 'reload_or_restart_unit',
  TRY_RELOAD_OR_RESTART_UNIT: 'try_reload_or_restart_unit',
  POWEROFF: 'poweroff',
  HALT: 'halt',
  REBOOT: 'reboot',
  SUSPEND: 'suspend',
  HIBERNATE: 'hibernate',
  HYBRID_SLEEP: 'hybrid_sleep',
  DAEMON_RELOAD: 'daemon_reload',
  ENABLE_UNIT: 'enable_unit',
  REENABLE: 'reenable',
  DISABLE: 'disable',
  MASK: 'mask',
  UNMASK: 'unmask',
  PRESET: 'preset',
  PRESET_ALL: 'preset_all',
  REVERT: 'revert',
  LINK: 'link',
};
