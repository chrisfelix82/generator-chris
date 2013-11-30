define(["jquery","jqm","angular","commonapp/app","commonapp/Store"],function($,jqm,ng,app,Store){

    //The view controller handles the data binding
     app.ngapp.controller('AnotherView',["$scope",function($scope){

         $(document).on("pageshow","[data-ng-controller='AnotherView']",function(){
             console.debug("show another view");
             $scope.name = Store.items[0];

             $scope.$apply();
         });
        $scope.home = function(){
            Store.items[0] = $scope.name;
            app.route("../controllers/HomeView","HomeView.html",{transition: "slide",reverse: true});
        };
     }]);

});