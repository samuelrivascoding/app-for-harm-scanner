import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vercel from "@vitejs/plugin-vercel"; // Import the Vercel plugin


// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "build",
  },
  plugins: [react(),vercel(),],
  define: {
    __APP_ENV__: JSON.stringify(process.env.VITE_VERCEL_ENV || 'development'),
    GOOGLE_PRIVATE_KEY: JSON.stringify(process.env.GOOGLE_PRIVATE_KEY),
    GOOGLE_CLIENT_EMAIL: JSON.stringify(process.env.GOOGLE_CLIENT_EMAIL),
    VITE_OPENAI_API_KEY: JSON.stringify(process.env.VITE_OPENAI_API_KEY),
  },
});
