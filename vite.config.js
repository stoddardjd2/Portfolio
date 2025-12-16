import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import path from "path";
import { imagetools } from "vite-imagetools";

export default defineConfig({
  plugins: [tailwindcss(), react(), imagetools()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "app"),
    },
  },
});
