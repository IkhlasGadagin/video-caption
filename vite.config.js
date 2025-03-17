import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:8001",
    },
  },
  plugins: [react()],
  define: {
    'process.env': process.env, // This ensures env variables are accessible
  },
});
