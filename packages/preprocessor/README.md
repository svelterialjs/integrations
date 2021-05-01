<h1 align="center">@svelterialjs/process</h1>
<p>
  <a href="https://www.npmjs.com/package/@svelterialjs/process" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/@svelterialjs/process.svg">
  </a>
  <a href="https://github.com/svelterialjs/integrations/tree/main/packages/preprocessor#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/svelterialjs/integrations/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/svelterialjs/integrations/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/ThComputerM/@svelterialjs/process" />
  </a>
  <a href="https://twitter.com/TheComputerM" target="_blank">
    <img alt="Twitter: TheComputerM" src="https://img.shields.io/twitter/follow/TheComputerM.svg?style=social" />
  </a>
</p>

> A Svelte preprocessor for Svelterial.

### 🏠 [Homepage](https://github.com/svelterialjs/integrations/tree/main/packages/preprocessor#readme)

## Install

```sh
npm i -D @svelterialjs/process
```

## Usage

You can use this method with **ANY TOOLING YOU PREFER** like rollup, webpack and even vite. Just add it to the preprocess method.

```js
const svelterial = require('@svelterialjs/process');
// OR
import svelterial from '@svelterialjs/process';

{
  svelte({
    preprocess: [..., svelterial({ your_config })]
  })
}
```

### Example: Rollup

```js
import svelte from 'rollup-plugin-svelte';
import svelterial from '@svelterialjs/process';

export default {
  plugins: [
    svelte({
      preprocess: svelterial({ your_config }),
    }),
  ],
};
```

## Author

👤 **TheComputerM**

- Twitter: [@TheComputerM](https://twitter.com/TheComputerM)
- Github: [@ThComputerM](https://github.com/ThComputerM)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/svelterialjs/integrations/issues). You can also take a look at the [contributing guide](https://github.com/svelterialjs/integrations/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2021 [TheComputerM](https://github.com/ThComputerM).<br />
This project is [MIT](https://github.com/svelterialjs/integrations/blob/master/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
