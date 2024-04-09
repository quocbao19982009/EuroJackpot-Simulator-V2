import react from "@vitejs/plugin-react-swc";
import * as path from "path";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: "**/*.svg",
    }),
  ],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "src/components"),
      },
      { find: "@layout", replacement: path.resolve(__dirname, "src/layouts/") },
      { find: "@redux", replacement: path.resolve(__dirname, "src/redux/") },
      { find: "@types", replacement: path.resolve(__dirname, "src/types/") },
    ],
  },
});
