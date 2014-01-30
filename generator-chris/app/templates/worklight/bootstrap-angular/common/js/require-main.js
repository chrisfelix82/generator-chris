define.amd.jQuery = true;
var appBaseUrl = window.location.href.substring(0,window.location.href.lastIndexOf("index.html"));
require.config({

    baseUrl: appBaseUrl,

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
        domReady               : "js/lib/requirejs-domready/domReady"
    },

    /**
     * for libs that either do not support AMD out of the box, or
     * require some fine tuning to dependency mgt'
     */
    shim: {
        'angular'         : {
            exports: 'angular'
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
    
    deps : ["ngRoute",
		    "ngCookies",
 		    "ngResource",
 		    "ngAnimate",
 		    "ngTouch",
 		    "ui.bootstrap"
            ],
            
   callback : function(){
	   require(["commonapp/app"],function(app){console.debug("App init complete!");});
   }
    

});