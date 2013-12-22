define(["commonapp/app",
        "i18n!./nls/<%= fileName %>"],function(app,nls){

    //The view controller handles the data binding
     return ["$scope",function($scope){

         $scope.text = nls;

         //Called when before leaving this view
         $scope.$on("$routeChangeStart",function(angularEvent,next,current){
             console.debug("hide");
         });

         //Called before entering this view
         $scope.$on("$routeChangeSuccess",function(angularEvent,current,previous){
             console.debug("hide");
         });


     }];

});