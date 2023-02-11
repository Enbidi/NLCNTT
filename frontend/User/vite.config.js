import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  switch (mode) {
    case "development":
      return {
        plugins: [vue()],
        base: "./",
        resolve: {
          alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
          },
        },
      };
    case "production":
      return {
        plugins: [vue()],
        base: "./",
        resolve: {
          alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
          },
        },
        build: {
          outDir: "../../backend/app/user_files",
          modulePreload: {
            resolveDependencies: (filename, deps, { hostId, hostType }) => {
              return deps.map((dep) => "/user_ui/" + dep);
            },
          },
        },
      }
  }
});
