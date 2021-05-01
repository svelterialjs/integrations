<h1 align="center">vite-plugin-svelte-svelterial</h1>
<p>
  <a href="https://www.npmjs.com/package/vite-plugin-svelte-svelterial" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/vite-plugin-svelte-svelterial.svg">
  </a>
  <a href="https://github.com/svelterialjs/integrations/tree/main/packages/vite-plugin#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/svelterialjs/integrations/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/svelterialjs/integrations/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/TheComputerM/vite-plugin-svelte-svelterial" />
  </a>
  <a href="https://twitter.com/TheComputerM" target="_blank">
    <img alt="Twitter: TheComputerM" src="https://img.shields.io/twitter/follow/TheComputerM.svg?style=social" />
  </a>
</p>

> A plugin for integration with Vite and SvelteKit.

### 🏠 [Homepage](https://github.com/svelterialjs/integrations/tree/main/packages/vite-plugin#readme)

## Install

```sh
npm i -D vite-plugin-svelte-svelterial
```

## Usage

### with just vite

```js
import { defineConfig } from 'vite';
import svelte from '@sveltejs/vite-plugin-svelte';
import svelterial from 'vite-plugin-svelte-svelterial';

export default defineConfig({
  plugins: [svelte(), svelterial({ your_config })],
});
```

### with SvelteKit

## Run tests

```sh
cd packages/vite-plugin
pnpm t
```

## Author

👤 **TheComputerM**

- Twitter: [@TheComputerM](https://twitter.com/TheComputerM)
- Github: [@TheComputerM](https://github.com/TheComputerM)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/svelterialjs/integrations/issues). You can also take a look at the [contributing guide](https://github.com/svelterialjs/integrations/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2021 [TheComputerM](https://github.com/TheComputerM).<br />
This project is [MIT](https://github.com/svelterialjs/integrations/blob/master/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
