var tests = ["ngRoute",
             "ngCookies",
             "ngResource",
             "ngAnimate",
             "ngTouch",
             "ui.bootstrap"
             ];

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
    	jquery                 : "js/lib/jquery/jquery",
        angular                : "js/lib/angular/angular",
        "ngCookies"            : "js/lib/angular-cookies/angular-cookies",
        "ngRoute"              : "js/lib/angular-route/angular-route",
        "ngResource"           : "js/lib/angular-resource/angular-resource",
        "ngAnimate"			   : "js/lib/angular-animate/angular-animate",
        "ngTouch"			   : "js/lib/angular-touch/angular-touch",
        "bootstrap"			   : "js/lib/bootstrap/dist/js/bootstrap",	
        "ui.bootstrap"         : "js/lib/angular-bootstrap/ui-bootstrap",
        "angular-bootstrap-tpls"    : "js/lib/angular-bootstrap/ui-bootstrap-tpls",
        i18n                   : "js/lib/requirejs-i18n/i18n",
        text                   : "js/lib/requirejs-text/text",
        domReady               : "js/lib/requirejs-domready/domReady",
        angularMocks           : "../../../test/angular-mocks"
    },

    /**
     * for libs that either do not support AMD out of the box, or
     * require some fine tuning to dependency mgt'
     */
    shim: {
        'angular'         : {
            exports: 'angular'
        },
        
        'angularMocks' : {
        	exports: 'angularMocks'
        },
        
        'ngCookies' : {
        	deps: ['angular'],
        	exports : "ngCookies"
        },
        
        'ngRoute' : {
        	deps: ['angular'],
        	exports : "ngRoute"
        },
        'ngResource' : {
        	deps: ['angular'],
        	exports: 'ngResource'
        },
        
        'ngAnimate' : {
        	deps: ['angular'],
        	exports: 'ngAnimate'
        },
        
        'ngTouch' : {
        	deps: ['angular'],
        	exports: 'ngTouch'
        },
        
        'bootstrap' : {
        	deps: ["jquery"],
        	exports: 'bootstrap'
        },
        
        'ui.bootstrap' : {
        	deps: ['angular','bootstrap'],
        	exports: "uiBootstrap"
        }
        
        
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
    		
});

