import { compileSass, globalStyles } from '@svelterialjs/plugin-utils';
import parseInfo from './parseInfo';
import { dirname } from 'path';
import { readFileSync } from 'fs';

export default (config = {}) => ({
  name: 'vite-plugin-svelte-svelterial',
  enforce: 'pre',
  sveltePreprocess: {
    script({ content, markup }) {
      const info = parseInfo(markup);
      if (typeof info.svelterial !== 'string') return null;
      const imported = `import 'svelterial:${info.svelterial}';\n\n`;
      return {
        code: imported + content,
      };
    },
    style({ content, attributes: info, filename }) {
      if (!info.svelterial || typeof info.svelterial === 'string') return null;
      const output = compileSass(content, config, {
        includePaths: [dirname(filename)],
      });
      return {
        code: globalStyles(output.css),
        dependencies: output.deps,
      };
    },
  },
  async resolveId(id, importer) {
    if (id.startsWith('svelterial:')) {
      const file = id.slice('svelterial:'.length);
      const location = await this.resolve(file, importer);
      return `${location.id}?svelterial`;
    }
  },
  load(id) {
    if (id.endsWith('?svelterial')) {
      const location = id.slice(0, -'?svelterial'.length);
      const content = readFileSync(location).toString();
      const output = compileSass(content, config, {
        includePaths: [dirname(location)],
      });
      return output.css;
    }
  },
});
