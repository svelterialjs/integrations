import deepmerge from 'deepmerge';
import defaultSettings from './defaultSettings';
import defaultTheme from './defaultTheme';
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
  const variables = {
    ...(config.variables || {}),
    settings: deepmerge(defaultSettings, config.settings || {}),
    themes: deepmerge(defaultTheme, config.themes || {}),
  };
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

        const [imported, mode] = url.split('?');
        const keys = imported.split('/').slice(1);
        const value = deepGet(variables, keys);
        const output = mode === 'self' ? { default: value } : value;
        const contents = variableTransformer(output);
        return { contents };
      },
    ],
  });

  return {
    css: result.css.toString(),
    deps: result.stats.includedFiles.filter(isNotSvelterialImport),
  };
};
