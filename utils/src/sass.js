import variableTransformer from './variableTransformer';
import sass from 'sass';

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
  const isNotSvelterialImport = (url) => !url.startsWith('svelterial/');
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
    ],
  });

  return {
    css: result.css.toString(),
    deps: result.stats.includedFiles.filter(isNotSvelterialImport),
  };
};
