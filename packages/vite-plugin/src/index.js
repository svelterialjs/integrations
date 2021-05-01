import { compileSass, globalStyles } from '@svelterialjs/plugin-utils';
import parseInfo from './parseInfo';

const { dirname, join } = require('path');
const { readFileSync } = require('fs');

export default (config = {}) => ({
  name: 'vite-plugin-svelte-svelterial',
  sveltePreprocess: {
    script({ content, markup }) {
      const info = parseInfo(markup);
      if (typeof info.svelterial !== 'string') return null;
      const imported = `import '${info.svelterial}?svelterial';\n\n`;
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
  resolveId(id, importer) {
    if (id.startsWith('svelterial:')) {
      const file = id.slice('svelterial:'.length);
      const location = join(dirname(importer), file);
      return `${location}?svelterial`;
    }
  },
  load(id) {
    if (id.endsWith('?svelterial')) {
      const location = id.slice(0, -'?svelterial'.length);
      this.addWatchFile(location);
      const content = readFileSync(location).toString();
      const output = compileSass(content, config, {
        includePaths: [dirname(location)],
      });
      for (let dep of output.deps) {
        this.addWatchFile(dep);
      }
      return output.css;
    }
  },
});
