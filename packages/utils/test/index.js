import { test } from 'uvu';
import { equal } from 'uvu/assert';
import globalStyles from '../src/globalStyles';
import transform from '../src/variableTransformer';
import compileSass from '../src/sass';

test('selectors', async () => {
  equal(globalStyles('a {display: flex;}'), ':global(a){display:flex;}');
  equal(
    globalStyles('.a, b, c.d {color: red;}'),
    ':global(.a),:global(b),:global(c.d){color:red;}'
  );
  equal(
    globalStyles('.a:hover {color: red;}'),
    ':global(.a:hover){color:red;}'
  );
});

test('string', () => {
  const values = {
    color: 'red',
  };

  equal(transform(values), '$color: red;');
});

test('string with comma', () => {
  const values = {
    shadow: '5px 5px blue, 10px 10px red, 15px 15px green',
  };

  equal(
    transform(values),
    '$shadow: (5px 5px blue, 10px 10px red, 15px 15px green);'
  );
});

test('boolean', () => {
  const values = {
    visible: true,
  };

  equal(transform(values), '$visible: true;');
});

test('number', () => {
  const values = {
    amount: 12,
  };

  equal(transform(values), '$amount: 12;');
});

test('array', () => {
  const values = {
    colors: ['red', 'blue', 'green'],
  };

  equal(transform(values), '$colors: (red,blue,green);');
});

test('maps', () => {
  const values = {
    sizes: {
      sm: '200px',
      md: '400px',
      lg: '800px',
    },
  };

  equal(transform(values), '$sizes: (sm: 200px,md: 400px,lg: 800px);');
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

  equal(transform(values), '$a: (b: (c: d));\n$e: f;');
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
  equal(css, 'h1{color:red}');
});

test('import single variable', () => {
  const input = [
    '@use "svelterial/Component" as c;',
    'h1 {color: c.$default}',
  ].join('\n');

  const config = {
    variables: {
      Component: 'red',
    },
  };

  const { css } = compileSass(input, config);
  equal(css, 'h1{color:red}');
});

test('import settings', () => {
  const input = [
    '@use "svelterial/settings/spacer" as c;',
    'h1 {font-size: c.$default}',
  ].join('\n');

  const { css } = compileSass(input, {});
  equal(css, 'h1{font-size:4px}');
});

test.run();
