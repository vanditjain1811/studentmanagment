import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      'https://lokapati.born4tech.com/api/student':"https://localhost:5173"
    }
  },
  plugins: [react()],
})
