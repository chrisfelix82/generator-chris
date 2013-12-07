var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/Spec\.js$/.test(file)) {
      tests.push(file);
    }
  }
}

define.amd.jQuery = true;
requirejs.config({
    // Karma serves files from '/base'
    baseUrl: 'base/<%= commonDir %>',

    paths: {
        jquery  : "js/lib/jquery/jquery",
        jquerymobile : 'js/lib/jquery-mobile-bower/js/jquery.mobile-1.3.2',
    	angular : "js/lib/angular/angular",
        angularMocks : "../../../test/angular-mocks",
        i18n    : "js/lib/requirejs-i18n/i18n",
        text    : "js/lib/requirejs-text/text"
    },

    /**
     * for libs that either do not support AMD out of the box, or
     * require some fine tuning to dependency mgt'
     */
    shim: {
    	
    	'angular' : { 
    		exports: 'angular'
    	},
         'angularMocks': {
             exports: 'angularMocks',
             deps : ['angular']
         }
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
    		
});

