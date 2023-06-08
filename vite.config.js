import path, { dirname } from 'path';
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
      open: "src/ui/ui.html"
    },
    // publicDir: "../public",
    // build: {
    //   outDir: "../dist"
    // },
    // resolve: {
    //   alias: { "/src": path.resolve(process.cwd(), "src") }
    // },
});
