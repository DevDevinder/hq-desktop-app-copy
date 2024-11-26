import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src', // Set the source directory for your app
  build: {
    outDir: '../dist', // Output directory for built files
    emptyOutDir: true, // Clear the output directory before building
  },
});
