# Syncano Socket for <name>

[![Syncano Socket](https://img.shields.io/badge/syncano-socket-blue.svg)](https://syncano.io)
[![CircleCI branch](https://img.shields.io/circleci/project/github/eyedea-io/syncano-socket-<name>/master.svg)](https://circleci.com/gh/eyedea-io/syncano-socket-<name>/tree/master)
[![Codecov branch](https://img.shields.io/codecov/c/github/eyedea-io/syncano-socket-<name>/master.svg)](https://codecov.io/github/eyedea-io/syncano-socket-<name>/)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![npm](https://img.shields.io/npm/dw/@eyedea-sockets/<name>.svg)](https://www.npmjs.com/package/@eyedea-sockets/<name>)
![license](https://img.shields.io/github/license/eyedea-io/syncano-socket-<name>.svg)

Main Socket features:

* **<name>/<endpoint>** — <endpoint description>

## Getting Started

Install package in your project:

```sh
cd my_project
npm install @syncano/cli --save-dev
npm install @eyedea-sockets/<name> --save
npx s deploy
```

Use it:

```js
import Syncano from '@syncano/client'

const s = new Syncano(<instaneName>)

// Search for a user
const params = {
}
const suggestions = await s.get('<name>/<endpoint>', params)

```
