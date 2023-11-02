import { defineConfig } from "rollup";
import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { dts } from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import filesize from "rollup-plugin-filesize";

// Package
const pkg = require("./package.json");

// Dist
const outputDir = "dist";

/**
 * To review the configuration of this file, as well as add or delete properties,
 * consult the following link.
 *
 * @see https://rollupjs.org/introduction/
 */
const config = defineConfig([
  {
    input: "src/index.ts",
    output: [
      // Nodejs
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: true,
        exports: "default"
      },
      // ES6
      {
        file: pkg.module,
        format: "es",
        sourcemap: true
      }
    ],
    external: ["axios"],
    plugins: [
      json(),
      // If commonjs() is used, babel should go below this function
      commonjs(),
      nodeResolve({ extensions: [".ts"] }),
      typescript({ tsconfig: "./tsconfig.json" }),
      terser(),
      filesize()
    ]
  },
  {
    input: `${outputDir}/es/index.d.ts`,
    output: { file: pkg.types, format: "es", sourcemap: true },
    plugins: [dts()]
  }
]);

export default config;
