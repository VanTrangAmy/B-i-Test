const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    video: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "./cypress/tests/automationExerciseTest/**",
    // baseUrl: "https://id.heroku.com",
    baseUrl: "https://www.demoblaze.com/",
    // baseUrl: "https://www.amazon.com/"
    reporter: "mochawesome"
  },
  defaultCommandTimeout: 10000
});
