define(["jquery","angular","commonapp/app","commonapp/Store",
        "i18n!./nls/AnotherView"],function($,angular,app,Store,nls){

    //The view controller handles the data binding
     angular.module("app").controller('AnotherView',["$scope",function($scope){

    	 $scope.text = nls;
    	 
         $(document).on("pageshow","[data-ng-controller='AnotherView']",function(p,data){
            console.debug("show another view");
            console.warn(app.viewParams);
            $scope.name = Store.items[app.viewParams.index];

            $scope.$apply();
         });
        $scope.home = function(){
            Store.items[app.viewParams.index] = $scope.name;
            app.route("HomeView",{transition: "slide",reverse: true});
        };
     }]);

});