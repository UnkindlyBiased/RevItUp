import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env': env
    },
    resolve: {
      alias: {
        path: "path-browserify",
        "@": path.resolve(__dirname, "./src")
      },
    },
    plugins: [react()],
    server: {
      port: 4004
    },
    manifest: {
      icons: [
        {
          src: "./public/favicon.png",
          size: '512x512',
          type: 'image/png'
        }
      ]
    }
  }
})
