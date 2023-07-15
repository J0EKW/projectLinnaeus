import { defineConfig } from "cypress";

export default defineConfig({
  defaultCommandTimeout: 8000,
  pageLoadTimeout:10000,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
