// electron.vite.config.ts
import { resolve } from "path";
import { defineConfig, externalizeDepsPlugin, bytecodePlugin } from "electron-vite";
import react from "@vitejs/plugin-react";
var electron_vite_config_default = defineConfig({
  main: {
    plugins: [bytecodePlugin(), externalizeDepsPlugin()]
  },
  preload: {
    plugins: [bytecodePlugin(), externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        "@renderer": resolve("src/renderer/src"),
        "@resources": resolve("resources"),
        "@components": resolve("src/renderer/src/components"),
        "@assets": resolve("src/renderer/src/assets")
      }
    },
    plugins: [react()]
  }
});
export {
  electron_vite_config_default as default
};
