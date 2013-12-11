define(["jquery","jquerymobile","text!./config.json","angular"],function($,jqm,configjson,angular){

    //Define the angular app
    angular.module('app',[]);
    var appConfig = JSON.parse(configjson);

    //After jQuery, load jQuery Mobile
    $(document).bind("mobileinit", function() {
        //Enable phone gap options
        $.mobile.phonegapNavigationEnabled = true;
        $.mobile.allowCrossDomainPages = true;
        $.support.cors = true;

        $.mobile.ajaxEnabled = false;
        $.mobile.linkBindingEnabled = false;
        $.mobile.hashListeningEnabled = false;
        $.mobile.pushStateEnabled = false;
    });

    $(document).on("pageload",function(event,data){
        angular.bootstrap($("[data-ng-controller=" + data.page[0].dataset.ngController + "]")[0],["app"]);
    });

    $(document).on("pageremove",function(event){
        //stop the view from being removed from the DOM once loaded
        //TODO: This may be costly, need to think of a better approach
        event.preventDefault();
    });

    /**
     * This module provides the code necessary to bootstrap the jqm-angular app.  Also it provides a basic routing function
     * @module commonapp/app
     */
    return {
        currentRoute : null,
        previousRoute : null,
        viewParams : {},


        /**
         * This function is used to route from one view to another using jQuery Mobile's changePage under the covers
         * @param {string} routeName - This is the name of the route that is located in @see commonapp/config.json routes object
         * @param {object} options - The standard options object that is passed to the changePage method
         * @see {@link http://api.jquerymobile.com/jQuery.mobile.changePage/}
         */
        route : function(routeName,options){
            var route = appConfig.routes[routeName];
            if(!route){console.error("The route",routeName,"does not exist!");return;}

            if(appConfig.routes[routeName].template === this.currentRoute){
                console.debug("Current route",this.currentRoute,"equals previous route, no-op");
                return;
            }//end if
            this.previousRoute = this.currentRoute;
            this.currentRoute = appConfig.routes[routeName].template;

            if(!options){
                options = {};
            }//end if
            options.changeHash = false;
            console.debug(routeName,$.mobile.activePage.data("url"));
            var currentUrl = $.mobile.activePage.data('url');
            var numJumpsToGetToRoot = 0;
            var prePath = "";
            if(currentUrl.indexOf("index.html") < 0){
                currentUrl = currentUrl.substring(currentUrl.indexOf('default/') + 8);
                numJumpsToGetToRoot = currentUrl.match(/\//g).length;
            }//end if

            for(var x = 0; x < numJumpsToGetToRoot; x++){
                prePath = prePath + "../";
            }//end for

            var ctrl = prePath + route.controller;
            var template = prePath + route.template;
            console.debug("Switching to controller",ctrl,"template",template);
            var _this = this;
            require([ctrl],function(ctrl){
                if(options.data){
                    //Add the data object to the app's view params
                    _this.viewParams = options.data;
                }else{
                    _this.viewParams = {};
                }//end if
                delete options.data;
                $.mobile.changePage(template,options);
            });
        }
    };

});