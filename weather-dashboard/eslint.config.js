import js from "@eslint/js";
import react from "eslint-plugin-react";
import prettier from "eslint-config-prettier";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: { react },
    rules: {
      "react/prop-types": "off",
      "no-unused-vars": "warn",
    },
  },
  prettier,
];
