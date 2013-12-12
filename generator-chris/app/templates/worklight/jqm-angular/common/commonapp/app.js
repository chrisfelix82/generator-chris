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
        currentRouteName : null,
        previousRouteName : null,
        backTransition : null,
        currentTransition: null,
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
            if(!options){options = {};}
            this.previousRoute = this.currentRoute;
            this.currentRoute = appConfig.routes[routeName].template;

            this.previousRouteName = this.currentRouteName;
            this.backTransition = this.currentTransition;
            this.currentRouteName = routeName;
            this.currentTransition = options.transition ? options.transition : "none";

            if(!options){
                options = {};
            }//end if
            options.changeHash = false;
            //console.debug("Current data url",$.mobile.activePage.data("url"));

            //TODO: If you are using worklight < 6.1, the name of index.html is the name of your worklight application
            var baseUrl = window.location.href.substring(0,window.location.href.lastIndexOf("index.html"));
            var template = baseUrl + route.template;

            var _this = this;
            require([route.controller],function(ctrl){
                if(options.data){
                    //Add the data object to the app's view params
                    _this.viewParams = options.data;
                }else{
                    _this.viewParams = {};
                }//end if
                delete options.data;
                console.debug("Switching to controller",route.controller,"template",template);
                $.mobile.changePage(template,options);
            });
        },

        goBack : function(options){
            if(this.previousRouteName !== null){
                if(!options){options = {};}
                if(!options.transition){
                    options.transition = this.backTransition;
                    options.reverse = true;
                }//end if
                this.route(this.previousRouteName,options);
            }else{
                console.warn("No view to go back to.  previousRouteName is null");
            }//end if
        }
    };

});