import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    permissions: ["storage", "tabs"],
    name: "Tab Notes",
    version: "1.0.0",
  },
});
