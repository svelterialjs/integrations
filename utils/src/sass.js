import variableTransformer from './variableTransformer';
import sass from 'sass';
import resolve from 'resolve';

function deepGet(obj, keys) {
  let output = obj;
  keys.forEach((key) => {
    output = output[key] || {};
  });
  return output;
}

/**
 * @param {string} input input css
 * @param {object} config config object
 * @param {object} options options to pass to the sass compiler
 */
export default (input, config, options = {}) => {
  const isNotSvelterialImport = (url) => !url.startsWith('svelterial:config/');
  const result = sass.renderSync({
    data: input,
    outputStyle: 'compressed',
    sourceMap: true,
    omitSourceMapUrl: true,
    ...options,
    importer: [
      (url) => {
        if (isNotSvelterialImport(url)) return null;

        const keys = url.split('/').slice(1);
        const value = deepGet(config, keys);
        const contents = variableTransformer(value);
        return { contents };
      },
      (url) => {
        try {
          let location = url;
          if (!url.endsWith('.scss')) {
            // is a partial
            const fullPath = url.split('/');
            const filename = fullPath.pop();
            location = fullPath.join('/') + `/_${filename}.scss`;
          }
          const file = resolve.sync(location, { basedir: process.cwd() });
          return { file }
        } catch {
          return null;
        }
      },
    ],
  });

  return {
    css: result.css.toString(),
    deps: result.stats.includedFiles.filter(isNotSvelterialImport),
  };
};
