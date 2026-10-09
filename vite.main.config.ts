import { defineConfig } from "vite";
import { aliases } from "./vite.config.ts";

// https://vitejs.dev/config
export default defineConfig({
  build: {
    minify: true,
    lib: {
      formats: ["es"],
      entry: "src/main/main.ts",
      fileName: "main",
    },
    rollupOptions: {
      output: {
        banner:
          'import { createRequire } from "node:module"; const require = createRequire(import.meta.url);',
      },
    },
  },
  resolve: {
    alias: aliases,
  },
});
