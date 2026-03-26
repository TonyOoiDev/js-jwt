import js from "@eslint/js";
import qunit from 'eslint-plugin-qunit';
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js, qunit }, extends: ["js/recommended", "eslint-plugin-qunit/configs/recommended" ], languageOptions: { globals: globals.node } },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
]);
