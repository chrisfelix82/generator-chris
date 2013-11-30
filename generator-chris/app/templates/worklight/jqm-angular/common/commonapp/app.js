define(["jquery"],function($){

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

    return {
      doneInit : false,
      ngapp: null,

      route : function(ctrl,view,options){
          var _this = this;
          if(!options){
              options = {};
          }//end if
          options.changeHash = false;
            this.init().then(function(app){
               require([ctrl],function(ctrl){
                    $.mobile.changePage(view,options);
                });
            });
      },

      /**
       * Init method for app
       */
      init : function(){
        var def = $.Deferred();
        var _this = this;
          if(!this.doneInit){
              require(["jqm"],function(jqm){
                  //After we load jQuery Mobile, we bootstrap our app's initial view
                  require(["angular"],function(ng){
                      $(document).on("pageload",function(p,data){
                          ng.bootstrap($("[data-ng-controller=" + data.page[0].dataset.ngController + "]")[0],["app"]);
                      });

                      $(document).on("pageremove",function(event){
                          //stop the view from being removed from the DOM once loaded
                          //TODO: This may be costly, need to think of a better approach
                           event.preventDefault();
                      });
                      _this.ngapp = ng.module("app",[]);
                      _this.doneInit = true;
                      def.resolve(_this.ngapp);
                  });
              });
          }else{
              def.resolve(_this.ngapp);
          }//end if
        return def.promise();
      }
    };

});