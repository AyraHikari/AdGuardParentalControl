import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "../www",
    emptyOutDir: true,
    rollupOptions: {
      input: "src/main.ts",
      output: {
        entryFileNames: "entrypoint.js",
        format: "es",
      },
    },
  },
});
