module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
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
  parserOptions: {
    parser: "babel-eslint",
  },
  overrides: [
    {
      files: ["**/__tests__/*.{j,t}s?(x)"],
      env: {
        jest: true,
      },
    },
  ],
};
