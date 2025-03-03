import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import postcss from "rollup-plugin-postcss";

export default {
  input: "src/index.tsx",
  output: [
    {
      file: "dist/index.es.js",
      format: "esm",
      sourcemap: true
    },
    {
      file: "dist/index.js",
      format: "cjs",
      sourcemap: true
    }
  ],
  plugins: [
    json(),
    postcss({
      extract: true, // Extracts CSS into a separate file
      minimize: true, // Minifies the CSS
    }),
    resolve(),
    commonjs(),
    babel({ babelHelpers: "bundled" }),
    typescript({
      jsx: "react-jsx", // ✅ Enable JSX support
      tsconfig: "./tsconfig.json"
    }),
    terser()
  ],
  external: ["react", "react-dom"],
};
