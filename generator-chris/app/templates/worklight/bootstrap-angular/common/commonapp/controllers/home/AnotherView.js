define(["commonapp/app",
        "commonapp/Store",
        "i18n!./nls/AnotherView"],function(app,Store,nls){

    //The view controller handles the data binding
    return ["$scope",function($scope){

    	 $scope.text = nls;
         $scope.$on("$routeChangeSuccess",function(angularEvent,current,previous){
            $scope.name = Store.items[current.params.index];
            $scope.index = current.params.index;
            //$scope.$apply();
         });

        $scope.home = function(){
            Store.items[$scope.index] = $scope.name;
            
            app.transition("slideRight");
        };
     }];

});