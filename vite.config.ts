import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {

    port: 8000,
  },
  preview: {
    host: true,
    port: 8000
  },
  // base:'/vega_admin_frontend/'
  base:''
})
