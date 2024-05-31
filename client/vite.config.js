import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import dns from 'node:dns'

// dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      "/graphql": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      // "/subscriptions": {
      //   target: "http://localhost:3000",
      //   changeOrigin: true,
      //   secure: false,
      //   ws: true,
      // },

    },
  },
});
