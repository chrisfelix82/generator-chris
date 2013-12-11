define.amd.jQuery = true;
var appBaseUrl = window.location.href.substring(0,window.location.href.lastIndexOf("index.html"));
require.config({

    baseUrl: appBaseUrl,

    paths: {
        jquery  : "js/lib/jquery/jquery",
        jquerymobile : "js/lib/jquery-mobile-bower/js/jquery.mobile-1.3.2",
        angular : "js/lib/angular/angular",
        i18n    : "js/lib/requirejs-i18n/i18n",
        text    : "js/lib/requirejs-text/text"
    },

    /**
     * for libs that either do not support AMD out of the box, or
     * require some fine tuning to dependency mgt'
     */
    shim: {
        'angular'         : {
            exports: 'angular'
        }
    }

});