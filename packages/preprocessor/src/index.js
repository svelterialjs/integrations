const { dirname } = require('path');
import { compileSass, globalStyles } from '@svelterialjs/plugin-utils';

export default (config = {}) => ({
  style({ content, attributes: info, filename }) {
    if (!info.svelterial) return null;

    let input = content;
    if (typeof info.svelterial === 'string') {
      input = `@use '${info.svelterial}';`;
    }

    const output = compileSass(input, config, {
      includePaths: [dirname(filename)],
    });

    return {
      code: globalStyles(output.css),
      dependencies: output.deps,
    };
  },
});
