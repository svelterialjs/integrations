import { replace } from 'tippex';

export default (code) => {
  const pattern = /import {(.+?)} from ['"]@svelterialjs\/(.+?)['"];?/g;
  return replace(code, pattern, (match, _files, source) => {
    if (!source.includes('/')) {
      /** @type {Array<string>} */
      const files = _files.split(',').map((_file) => {
        const file = _file.trim();
        if (file.includes(' as ')) {
          return file.split(' as ');
        }
        return [file, file];
      });
      const imports = files.map(
        ([from, as]) =>
          `import ${as} from '@svelterialjs/${source}/src/${from}.svelte';`
      );
      return imports.join('\n');
    }
    return match;
  });
};
