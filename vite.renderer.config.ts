import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { aliases } from "./vite.config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: aliases,
  },
});
