define(["jquery","angular","commonapp/app","commonapp/Store",
        "i18n!./nls/AnotherView"],function($,angular,app,Store,nls){

    //The view controller handles the data binding
     angular.module("app").controller('AnotherView',["$scope",function($scope){

    	 $scope.text = nls;
    	 
         $(document).on("pageshow","[data-ng-controller='AnotherView']",function(){
             console.debug("show another view");
             $scope.name = Store.items[0];

             $scope.$apply();
         });
        $scope.home = function(){
            Store.items[0] = $scope.name;
            app.route("HomeView",{transition: "slide",reverse: true});
        };
     }]);

});