import { fileURLToPath, URL } from "node:url";
import path from "node:path";

import { defineConfig } from "vite";
import sourcemaps from "rollup-plugin-sourcemaps";
import replace from "@rollup/plugin-replace";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    sourcemaps({
      // Excluding Sentry as it has broken source maps that break the build
      exclude: ["**/@sentry/**"],
    }),
    replace({
      values: {
        __modulename: (id) => {
          return JSON.stringify(path.relative("../..", id));
        },
      },
      preventAssignment: true,
    }),
  ],
  worker: {
    plugins: [
      replace({
        values: {
          __modulename: (id) => {
            return JSON.stringify(path.relative("../..", id));
          },
        },
        preventAssignment: true,
      }),
    ],
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
