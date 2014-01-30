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
    deps: ["ngRoute",
        "ngCookies",
        "ngResource",
        "ngAnimate",
        "ngTouch",
        "ui.bootstrap"
    ],

    // start test run, once Require.js is done
    callback: function(){
        var tests = new Array();
        for (var file in window.__karma__.files) {
            window.__karma__.files[file.replace(/^\//, '')] = window.__karma__.files[file];//duplicate file references to window.__karma__.files that map to what the monkeypatch is looking for (basically, removing the leading slash so the URL becomes a Require.js module path)
            if (window.__karma__.files.hasOwnProperty(file)) {
                if (/Spec\.js$/.test(file)) {
                    tests.push(file);
                }
            }
        }//end for
        require(tests,function(){
            window.__karma__.start();
        });
    }


});