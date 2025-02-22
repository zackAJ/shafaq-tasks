import { defineConfig, AliasOptions } from 'vite'
import react from '@vitejs/plugin-react'
//@ts-ignore
import path from "path";
import tailwindcss from '@tailwindcss/vite';

//@ts-ignore
const root = path.resolve(__dirname, "src");

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": root,
    } as AliasOptions,
  },
  optimizeDeps: {
    exclude: ['js-big-decimal']
  }
})
