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

Get the status of a service.

```
query {
  status(pattern: 'docker.service') {
    loadState
    activeState
    mainPid
  }
}
//=> {
//=>   "data": {
//=>     "status": {
//=>       "loadState": "loaded",
//=>       "activeState": true,
//=>       "mainPid": 22229
//=>     }
//=>   }
//=> }
```

## License

[MIT licensed](./LICENSE)
