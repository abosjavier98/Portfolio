module.exports = {
  default: {
    require: ["support/hooks.js", "step_definitions/**/*.js"],
    format: [
      "progress-bar",
      "json:reports/cucumber-report.json",
      "html:reports/cucumber-report.html",
    ],
    formatOptions: {
      snippetInterface: "async-await",
    },
    parallel: 2,
  },
};
