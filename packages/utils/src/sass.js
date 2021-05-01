import deepmerge from 'deepmerge';
import defaultSettings from './defaultSettings';
import defaultTheme from './defaultTheme';
import variableTransformer from './variableTransformer';

const sass = require('sass');

function deepGet(value, keys) {
  let output = value;
  keys.forEach((key) => {
    const value = output[key];
    output = typeof value === 'object' ? value : { default: value };
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

        const imported = url.split('/').slice(1);
        const contents = variableTransformer(deepGet(variables, imported));
        return { contents };
      },
    ],
  });

  return {
    css: result.css.toString(),
    deps: result.stats.includedFiles.filter(isNotSvelterialImport),
  };
};
