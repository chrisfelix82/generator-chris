define(["jquery","jqm","angular","commonapp/app"],function($,jqm,ng,app){

    //The view controller handles the data binding
     app.ngapp.controller('<%= fileName %>',["$scope",function($scope){

         $scope.items = Store.items;

         $(document).on("pageshow","[data-ng-controller='<%= fileName %>']",function(page){
             console.debug("show");
             $scope.items.push(new Date());

             $scope.$apply();
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

        
         // app.route("../controllers/AnotherView","AnotherView.html",{transition: "slide"});
         

     }]);

});