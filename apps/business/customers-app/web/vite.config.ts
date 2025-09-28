import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

export default defineConfig({
  plugins: [preact()],
  server: { port: 3003 },
  preview: { port: 5003 },
  resolve: {
    alias: {
      'react': 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime',
    },
  },
});
