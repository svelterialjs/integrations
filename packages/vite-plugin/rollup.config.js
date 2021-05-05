import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.mjs',
      format: 'es',
    },
    {
      file: 'dist/index.cjs',
      format: 'cjs',
      exports: 'default',
    },
  ],
  plugins: [nodeResolve(), commonjs(), !process.env.ROLLUP_WATCH && terser()],
  external: ['sass']
};
