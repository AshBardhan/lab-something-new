// Karma configuration
// Generated on Tue Feb 10 2026 01:49:03 GMT+0530 (India Standard Time)
//jshint strict: false
process.env.CHROME_BIN = "/usr/bin/chromium-browser";
process.env.FIREFOX_BIN = "/usr/bin/firefox";

module.exports = function (config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: "./app",

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ["jasmine"],

    // list of files / patterns to load in the browser
    files: [
      "lib/angular/angular.js",
      "lib/angular-animate/angular-animate.js",
      "lib/angular-resource/angular-resource.js",
      "lib/angular-route/angular-route.js",
      "../node_modules/angular-mocks/angular-mocks.js",
      "**/*.module.js",
      "*!(.module|.spec).js",
      "!(lib)/**/*!(.module|.spec).js",
      "**/*.spec.js",
    ],

    // list of files / patterns to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      "**/!(*.spec).js": ["coverage"],
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ["progress", "kjhtml", "coverage"],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ["Chrome", "Firefox"],

    // additional plugins to load
    plugins: [
      "karma-chrome-launcher",
      "karma-firefox-launcher",
      "karma-jasmine",
      "karma-jasmine-html-reporter",
      "karma-coverage",
    ],

    // coverage reporter configuration
    coverageReporter: {
      dir: "../coverage",
      reporters: [{ type: "html", subdir: "html" }, { type: "text-summary" }],
    },

    // client configuration
    client: {
      clearContext: false, // keeps jasmine HTML visible
    },
  });
};
