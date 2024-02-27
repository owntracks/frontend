import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import eslintPluginVue from "eslint-plugin-vue";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import vueParser from "vue-eslint-parser";
import { FlatCompat } from "@eslint/eslintrc";

const eslintrc = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
});

export default [
  ...eslintrc.extends("plugin:vue/essential"),
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      parser: vueParser,
    },
    plugins: {
      vue: eslintPluginVue,
    },
    rules: {
      "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn",
      "max-len": [
        "error",
        {
          ignoreUrls: true,
        },
      ],
      "prettier/prettier": [
        "error",
        {
          trailingComma: "es5",
          printWidth: 80,
          htmlWhitespaceSensitivity: "ignore",
        },
      ],
      "vue/multi-word-component-names": [
        "error",
        {
          ignores: ["Map"],
        },
      ],
    },
  },
];
