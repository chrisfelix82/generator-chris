define(["module",
        "commonapp/app",
        "i18n!./nls/<%= fileName %>"],function(module,app,nls){

    var MODULE = module.id;
    //The view controller handles the data binding
     return ["$scope",function($scope){

         $scope.text = nls;

         //Called before leaving this view
         $scope.$on("$routeChangeStart",function(angularEvent,nextView,currentView){
             console.debug("leaving view",MODULE);
         });

         //Called before entering this view
         $scope.$on("$routeChangeSuccess",function(angularEvent,currentView,previousView){
             console.debug("entering view",MODULE);
         });

         //use app.setTransition("slideLeft"); or some other css class when exiting this view so that it animates out
         //this is the standard angular .ng-enter-* css animation that you can see defined in common/css/common.css


     }];

});