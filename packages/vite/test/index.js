import { test } from 'uvu';
import * as assert from 'uvu/assert';

import parseInfo from '../src/parseInfo';

test('no tag', () => {
  const input = '<script></script>';
  const output = JSON.stringify(parseInfo(input));

  assert.snapshot(output, '{}');
});

test('no attribute', () => {
  const input = '<style></style>';
  const output = JSON.stringify(parseInfo(input));

  assert.snapshot(output, '{}');
});

test('single attribute', () => {
  const input = '<style a></style>';
  const output = JSON.stringify(parseInfo(input));

  assert.snapshot(output, '{"a":true}');
});

test('named attribute', () => {
  const input = '<style a="cat"></style>';
  const output = parseInfo(input);
  assert.equal(output.a, 'cat');
});

test('mixed', () => {
  const input = '<style lol a="cat" bad=false code></style>';
  const output = parseInfo(input);
  assert.equal(output.a, 'cat');
  assert.equal(output.lol, true);
  assert.equal(output.bad, false);
  assert.equal(output.code, true);
});

test.run();
