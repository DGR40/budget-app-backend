import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // depending on your application, base can also be "/"
  base: "",
  plugins: [react(["index.js"])],
  server: {
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
});
