import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true }, sourceType: "module" },
    },
    plugins: { "react-hooks": reactHooks, "react-refresh": reactRefresh },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "no-undef": "error",
      // Automatic JSX runtime: `import React` is legal but unused
      "no-unused-vars": ["error", { varsIgnorePattern: "^React$", argsIgnorePattern: "^_" }],
      // Newer React compiler rule; kept as a warning rather than an error
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  {
    // Vitest files get test globals
    files: ["**/*.test.{js,jsx}", "src/test/**"],
    languageOptions: {
      globals: { test: "readonly", expect: "readonly", describe: "readonly", it: "readonly", vi: "readonly", beforeEach: "readonly" },
    },
  },
];