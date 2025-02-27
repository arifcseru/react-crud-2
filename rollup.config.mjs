import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";

export default {
  input: "src/index.tsx",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
      exports: "auto"
    },
    {
      file: "dist/index.es.js",
      format: "es"
    }
  ],
  external: ["react", "react-dom"],
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    babel({ babelHelpers: "bundled" })
  ]
};
