import { dirname } from 'path';
import {
  compileSass,
  globalStyles,
  optimizeImports,
} from '@svelterialjs/plugin-utils';

export default (config = {}) => ({
  script: ({ content }) => ({
    code: optimizeImports(content),
  }),
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
