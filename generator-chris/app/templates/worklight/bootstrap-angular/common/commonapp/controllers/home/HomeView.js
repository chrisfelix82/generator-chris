define(["commonapp/app",
        "commonapp/Store",
        "i18n!./nls/HomeView",
        "commonapp/directives/SampleDirective"],function(app,Store,nls){
	
    //The view controller handles the data binding
     return ["$scope",function($scope){

         $scope.items = Store.items;
         $scope.text = nls;

        $scope.$on("$routeChangeSuccess",function(angularEvent,current,previous){
             console.debug("show");
             $scope.items.push(new Date());
      
             //$scope.$apply();
         }); 
         $scope.$on("$routeChangeStart",function(angularEvent,next,current){
             console.debug("hide");
         }); 

         $scope.clickItem = function(index){
        	 //Take the index, and tell the detail view modify the element at that index
        	 $scope.index = index;
        	 Store.items = $scope.items;
        	 app.setTransition("slideLeft"); 
        	 window.location.href= "#/anotherView/" + index;
         };

     }];

});