import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./",
  // GSAP's subpath modules can't be loaded by Node directly, so bundle it for the prerender build.
  ssr: { noExternal: ["gsap"] },
});
