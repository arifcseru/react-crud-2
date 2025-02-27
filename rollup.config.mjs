import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';


export default {
  input: 'src/index.tsx',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs'
    },
    {
      file: 'dist/index.es.js',
      format: 'es'
    }
  ],
  plugins: [
    resolve(),
    commonjs(),
    babel({ babelHelpers: 'bundled', presets: ['@babel/preset-react'] }),
    terser()
  ]
};
