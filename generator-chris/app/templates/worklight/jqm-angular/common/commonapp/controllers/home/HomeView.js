define(["jquery","angular","commonapp/app","commonapp/Store",
        "i18n!./nls/HomeView"],function($,angular,app,Store,nls){
	
    //The view controller handles the data binding
     angular.module("app").controller('HomeView',["$scope",function($scope){

         $scope.items = Store.items;
         $scope.text = nls;

         $(document).on("pageshow","[data-ng-controller='HomeView']",function(page){
             console.debug("show");
             $scope.items.push(new Date());
     
             $scope.$apply();
         });
         $(document).on("pagehide","[data-ng-controller='HomeView']",function(){
             console.debug("hide");
         });
        
         
         $scope.clickItem = function(index){
        	 //Take the index, and tell the detail view modify the element at that index
        	 app.route("AnotherView",{transition: "slide", data: {index: index}});
         };

     }]);

});