# systemd-graphql

A GraphQL API for systemd - a popular System and Service Manager for linux. It provides a unified abstraction layer for the many APIs of systemd. Developers get a single endpoint to send requests and powerful schema introspection.

## Getting started

```
git clone https://github.com/wurde/systemd-graphql
cd systemd-graphql
npm install
sudo npm start
//=> Server is running on http://localhost:18888
```

## Examples

### System Management (`systemctl`)

- [List services](./examples/services/list-services.graphql)
- [Get service status](./examples/services/service-status.graphql)
- [Start, stop, and restart services](./examples/services/start-stop-restart.graphql)
- [Add multiple units](./examples/services/add-units.graphql)
- [Edit multiple units](./examples/services/edit-units.graphql)
- [Reload systemd](./examples/services/reload-systemd.graphql)
- [Fetch journal logs](./examples/services/fetch-journal.graphql)
- [Boot-up performance statistics](./examples/services/boot-stats.graphql)
- [System reboot](./examples/services/system-reboot.graphql)

### Login Management (`loginctl`)

- [List sessions](./examples/sessions/list-sessions.graphql)
- [Lock and unlock sessions](./examples/sessions/lock-unlock-sessions.graphql)
- [Show user status](./examples/sessions/user-status.graphql)
- [Terminate user session](./examples/sessions/terminate-session.graphql)

### Hostname Management (`hostnamectl`)

- [Show hostname status](./examples/hostname/hostname-status.graphql)
- [Set hostname](./examples/hostname/set-hostname.graphql)
- [Set deployment environment](./examples/hostname/set-deployment-env.graphql)
- [Set chassis type](./examples/hostname/set-chassis-type.graphql)
- [Set machine location](./examples/hostname/set-machine-location.graphql)

### Locale Management (`localectl`)

- [Get locale status](./examples/locale/locale-status.graphql)
- [List available locales](./examples/locale/list-locales.graphql)
- [Set locale](./examples/locale/set-locale.graphql)
- [Set keyboard layout](./examples/locale/set-keyboard-layout.graphql)

### Boot Management (`bootctl`)

- [Get boot loader status](./examples/boot/bootloader-status.graphql)
- [Update boot loader](./examples/boot/update-bootloader.graphql)

### Time/Date Management (`timedatectl`)

- [Show system clock settings](./examples/time/sys-clock-status.graphql)
- [Set current time and timezone](./examples/time/set-current-timezone.graphql)

### Network Management (`networkctl`)

- [List networks](./examples/network/list-networks.graphql)
- [Show network status](./examples/network/network-status.graphql)

### PulseAudio Management (`pactl`)

- [Play audio sample](./examples/pulse-audio/play-audio-sample.graphql)
- [Mute input source](./examples/pulse-audio/mute-input-source.graphql)

### D-BUS Management (`busctl`)

- [Show peers on bus](./examples/d-bus/show-peers-on-bus.graphql)
- [Capture service messages](./examples/d-bus/capture-service-messages.graphql)
- [Monitor all messages](./examples/d-bus/monitor-all-messages.graphql)

### Disk Management (`udisksctl`)

- [Get disk status](./examples/disk/disk-status.graphql)
- [Mount a disk](./examples/disk/mount-disk.graphql)
- [Lock a disk](./examples/disk/lock-disk.graphql)
- [Setup a loop device](./examples/disk/setup-loop-device.graphql)

## License

[MIT licensed](./LICENSE)
