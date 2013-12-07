define(["jquery","angular","commonapp/app","i18n!./nls/<%= fileName %>"],function($,angular,app,nls){

    //The view controller handles the data binding
     angular.module("app").controller('<%= fileName %>',["$scope",function($scope){

         $scope.text = nls;
         
         $(document).on("pageshow","[data-ng-controller='<%= fileName %>']",function(page){
             console.debug("show");

         });
         $(document).on("pagehide","[data-ng-controller='<%= fileName %>']",function(){
             console.debug("hide");
         });
         $(document).on("pagebeforeshow","[data-ng-controller='<%= fileName %>']",function(){
             console.debug("before show");

         });
         $(document).on("pagebeforehide","[data-ng-controller='<%= fileName %>']",function(){
             console.debug("before hide");
         });

         

     }]);

});