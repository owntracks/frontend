import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";
import version from "vite-plugin-package-version";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), version()],
  resolve: {
    alias: {
      "@": resolve(dirname(fileURLToPath(import.meta.url)), "./src"),
    },
  },
  test: {
    environment: "jsdom",
  },
});
