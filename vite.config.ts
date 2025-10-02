import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// To deploy on GitHub Pages under a repo like /github-repos-explorer/,
// set BASE_PATH env or edit 'base' below after you know your repo name.

export default defineConfig({
  plugins: [react()],
  base: "/github-repos-explorer/", // <--- sesuai nama repo
});
