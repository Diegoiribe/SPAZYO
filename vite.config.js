import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: 'spazyo.test',
    port: 3001,
    https: {
      key: fs.readFileSync('./spazyo.test+1-key.pem'),
      cert: fs.readFileSync('./spazyo.test+1.pem')
    },
    hmr: {
      host: 'spazyo.test',
      protocol: 'wss',
      port: 3001
    }
  }
});
