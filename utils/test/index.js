import { suite } from 'uvu';
import { snapshot } from 'uvu/assert';

const GlobalStyles = suite('GlobalStyles');
import globalStyles from '../src/globalStyles';

GlobalStyles('selectors', async () => {
  snapshot(globalStyles('a {display: flex;}'), ':global(a){display:flex;}');
  snapshot(
    globalStyles('.a, b, c.d {color: red;}'),
    ':global(.a),:global(b),:global(c.d){color:red;}'
  );
  snapshot(globalStyles('.a b {color: red;}'), ':global(.a b){color:red;}');
  snapshot(
    globalStyles('.a:hover {color: red;}'),
    ':global(.a:hover){color:red;}'
  );
});

GlobalStyles('keyframes', async () => {
  snapshot(
    globalStyles(
      ['@keyframes a {', 'from {top: 0px;}', 'to {top: 200px;}', '}'].join('\n')
    ),
    '@keyframes a{from{top:0px;}to{top:200px;}}'
  );

  snapshot(
    globalStyles(
      [
        '@keyframes a {',
        '0% {top: 0px;}',
        '50% {top: 100px;}',
        '100% {top: 0px;}',
        '}',
      ].join('\n')
    ),
    '@keyframes a{0%{top:0px;}50%{top:100px;}100%{top:0px;}}'
  );
});

GlobalStyles.run();

const VarTransform = suite('VarTransform');
import transform from '../src/variableTransformer';

VarTransform('string', () => {
  const values = {
    color: 'red',
  };

  snapshot(transform(values), '$color: red;');
});

VarTransform('string with comma', () => {
  const values = {
    shadow: '5px 5px blue, 10px 10px red, 15px 15px green',
  };

  snapshot(
    transform(values),
    '$shadow: (5px 5px blue, 10px 10px red, 15px 15px green);'
  );
});

VarTransform('boolean', () => {
  const values = {
    visible: true,
  };

  snapshot(transform(values), '$visible: true;');
});

VarTransform('number', () => {
  const values = {
    amount: 12,
  };

  snapshot(transform(values), '$amount: 12;');
});

VarTransform('array', () => {
  const values = {
    colors: ['red', 'blue', 'green'],
  };

  snapshot(transform(values), '$colors: (red,blue,green);');
});

VarTransform('maps', () => {
  const values = {
    sizes: {
      sm: '200px',
      md: '400px',
      lg: '800px',
    },
  };

  snapshot(transform(values), '$sizes: (sm: 200px,md: 400px,lg: 800px);');
});

VarTransform('nested', () => {
  const values = {
    a: {
      b: {
        c: 'd',
      },
    },
    e: 'f',
  };

  snapshot(transform(values), '$a: (b: (c: d));\n$e: f;');
});

VarTransform.run();

const SassCompiler = suite('SassCompiler');
import compileSass from '../src/sass';

SassCompiler('import variable map', () => {
  const input = [
    '@use "svelterial/Component" as c;',
    'h1 {color: c.$color}',
  ].join('\n');

  const config = {
    Component: {
      color: 'red',
    },
  };

  const { css } = compileSass(input, config);
  snapshot(css, 'h1{color:red}');
});

SassCompiler('no error when import undefined', () => {
  const input = '@use "svelterial/Component"';

  const { css } = compileSass(input, {});
  snapshot(css, '');
});

SassCompiler.run();

const OptimizeImports = suite('OptimizeImports');
import optimizeImports from '../src/optimizeImports';

OptimizeImports('single quote import', () => {
  const input = `import { C1 } from '@svelterialjs/random';`;
  snapshot(
    optimizeImports(input),
    `import C1 from '@svelterialjs/random/src/C1.svelte';`
  );
});

OptimizeImports('double quote import', () => {
  const input = `import { C1 } from "@svelterialjs/random";`;
  snapshot(
    optimizeImports(input),
    `import C1 from '@svelterialjs/random/src/C1.svelte';`
  );
});

OptimizeImports('import everything', () => {
  const input1 = `import * as C from '@svelterialjs/random';`;
  snapshot(
    optimizeImports(input1),
    `import * as C from '@svelterialjs/random';`
  );

  const input2 = `import * from '@svelterialjs/random';`;
  snapshot(optimizeImports(input2), `import * from '@svelterialjs/random';`);
});

OptimizeImports('import from inside a folder', () => {
  const input = `import C1 from '@svelterialjs/random/folder';`;
  snapshot(
    optimizeImports(input),
    `import C1 from '@svelterialjs/random/folder';`
  );
});

OptimizeImports('multiple imports', () => {
  const input = `import {C1, C2} from '@svelterialjs/random'`;
  snapshot(
    optimizeImports(input),
    [
      `import C1 from '@svelterialjs/random/src/C1.svelte';`,
      `import C2 from '@svelterialjs/random/src/C2.svelte';`,
    ].join('\n')
  );
});

OptimizeImports('import as alias', () => {
  const input = `import {C1, C2 as C3} from '@svelterialjs/random'`;
  snapshot(
    optimizeImports(input),
    [
      `import C1 from '@svelterialjs/random/src/C1.svelte';`,
      `import C3 from '@svelterialjs/random/src/C2.svelte';`,
    ].join('\n')
  );
});

OptimizeImports('multiple line import', () => {
  const input = [
    `import { C1,`,
    `         C2,`,
    `         C3 } from '@svelterialjs/random'`,
  ].join('\n');
  snapshot(
    optimizeImports(input),
    [
      `import C1 from '@svelterialjs/random/src/C1.svelte';`,
      `import C2 from '@svelterialjs/random/src/C2.svelte';`,
      `import C3 from '@svelterialjs/random/src/C3.svelte';`,
    ].join('\n')
  );
});

OptimizeImports.run();
