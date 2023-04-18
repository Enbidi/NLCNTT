import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const common = {
    plugins: [vue()],
    base: './',
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    }
  }
  switch (mode) {
    case "development":
      return {
        ...common
      }
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
