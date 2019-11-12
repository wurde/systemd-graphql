# systemd-graphql

A GraphQL API for [systemd](https://github.com/systemd/systemd).

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
