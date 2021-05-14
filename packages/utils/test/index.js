import { test } from 'uvu';
import { snapshot } from 'uvu/assert';
import globalStyles from '../src/globalStyles';
import transform from '../src/variableTransformer';
import compileSass from '../src/sass';

test('selectors', async () => {
  snapshot(globalStyles('a {display: flex;}'), ':global(a){display:flex;}');
  snapshot(
    globalStyles('.a, b, c.d {color: red;}'),
    ':global(.a),:global(b),:global(c.d){color:red;}'
  );
  snapshot(
    globalStyles('.a b {color: red;}'),
    ':global(.a b){color:red;}'
  );
  snapshot(
    globalStyles('.a:hover {color: red;}'),
    ':global(.a:hover){color:red;}'
  );
});

test('keyframes', async () => {
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

test('string', () => {
  const values = {
    color: 'red',
  };

  snapshot(transform(values), '$color: red;');
});

test('string with comma', () => {
  const values = {
    shadow: '5px 5px blue, 10px 10px red, 15px 15px green',
  };

  snapshot(
    transform(values),
    '$shadow: (5px 5px blue, 10px 10px red, 15px 15px green);'
  );
});

test('boolean', () => {
  const values = {
    visible: true,
  };

  snapshot(transform(values), '$visible: true;');
});

test('number', () => {
  const values = {
    amount: 12,
  };

  snapshot(transform(values), '$amount: 12;');
});

test('array', () => {
  const values = {
    colors: ['red', 'blue', 'green'],
  };

  snapshot(transform(values), '$colors: (red,blue,green);');
});

test('maps', () => {
  const values = {
    sizes: {
      sm: '200px',
      md: '400px',
      lg: '800px',
    },
  };

  snapshot(transform(values), '$sizes: (sm: 200px,md: 400px,lg: 800px);');
});

test('nested', () => {
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

test('import variable map', () => {
  const input = [
    '@use "svelterial/Component" as c;',
    'h1 {color: c.$color}',
  ].join('\n');

  const config = {
    variables: {
      Component: {
        color: 'red',
      },
    },
  };

  const { css } = compileSass(input, config);
  snapshot(css, 'h1{color:red}');
});

test('import single variable', () => {
  const input = [
    '@use "svelterial/Component?self" as c;',
    'h1 {color: c.$default}',
  ].join('\n');

  const config = {
    variables: {
      Component: 'red',
    },
  };

  const { css } = compileSass(input, config);
  snapshot(css, 'h1{color:red}');
});

test('import settings', () => {
  const input = [
    '@use "svelterial/settings/spacer?self" as c;',
    'h1 {font-size: c.$default}',
  ].join('\n');

  const { css } = compileSass(input, {});
  snapshot(css, 'h1{font-size:4px}');
});

test('no error when import undefined', () => {
  const input = '@use "svelterial/Component"';

  const { css } = compileSass(input, {});
  snapshot(css, '');
});

test.run();
