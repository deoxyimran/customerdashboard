import path, { dirname } from 'path';
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
      open: "src/ui/ui.html"
    },
    build: {    
      rollupOptions: {
        input: "src/ui/ui.html",
      },
      outDir: "./dist"
    },
});
