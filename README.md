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

- [List services](./examples/list-services.graphql)
- [Get service status](./examples/service-status.graphql)
- [Start, stop, and restart services](./examples/start-stop-restart.graphql)
- [Add multiple units](./examples/add-units.graphql)
- [Edit multiple units](./examples/edit-units.graphql)
- [Reload systemd](./examples/reload-systemd.graphql)
- [Fetch journal logs](./examples/fetch-journal.graphql)
- [Boot-up performance statistics](./examples/boot-stats.graphql)
- [System reboot](./examples/system-reboot.graphql)

## License

[MIT licensed](./LICENSE)
