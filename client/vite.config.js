import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(async ({ mode }) => {
  const plugins = [react(), tailwindcss()];

  if (mode === "development") {
    try {
      const mkcert = (await import("vite-plugin-mkcert")).default;
      plugins.push(mkcert());
    } catch (e) {
      console.warn(
        "vite-plugin-mkcert not found or failed to load. Running without HTTPS certificate generation."
      );
      console.warn("Error details:", e);
    }
  }

  return {
    plugins: plugins,
    server: {
      https: mode === "development",
      port: 5173,
      host: true,
      build: {
        outDir: "dist",
      },
    },
  };
});
