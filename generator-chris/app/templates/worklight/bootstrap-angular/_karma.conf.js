// Karma configuration
// Generated on Thu Dec 05 2013 18:15:19 GMT-0500 (EST)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',


    // frameworks to use
    frameworks: ['jasmine', 'requirejs'],

    // list of files / patterns to load in the browser
    files: [
      '<%= commonDir %>/js/lib/angular/angular.js',
	  'test/angular-mocks.js',
	  {pattern: '<%= commonDir %>/js/lib/**/*.js', included: false},
      {pattern: 'test/unit/**/*Spec.js', included: false}, 
      {pattern: '<%= commonDir %>/commonapp/**/*.js', included: false},
      {pattern: '<%= commonDir %>/commonapp/**/*.json', included: false},
      {pattern: '<%= commonDir %>/commonapp/**/*.html', watched: true, included: false, served: true},
      'test/test-main.js'
    
    ],


    // list of files to exclude
    exclude: [
      "<%= commonDir %>/js/main.js",
      "<%= commonDir %>/js/require-main.js"
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress','growl','html','coverage'],

    preprocessors : {
        '<%= commonDir %>/commonapp/*.js': ['coverage'],
        '**/*.html': []
    },
    coverageReporter : {
        type : 'html',
        dir : '../rexpress/frontend/test/coverage/'
    },
    htmlReporter: {
        outputFile: '../rexpress/frontend/test/unit/index.html'
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['Chrome'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
