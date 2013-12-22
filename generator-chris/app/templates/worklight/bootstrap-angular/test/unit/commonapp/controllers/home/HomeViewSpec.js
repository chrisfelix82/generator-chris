'use strict';
define(["module","angular","commonapp/controllers/home/HomeView"],function(module,angular,HomeView){
 
	describe(module.id, function(){
		var scope;//we'll use this scope in our tests
		 
	    //mock Application to allow us to inject our own dependencies
	    beforeEach(angular.mock.module('app'));
	    beforeEach(function(){
	    	angular.module("app").controller("HomeView",HomeView);
	    });
	    //mock the controller for the same reason and include $rootScope and $controller
	    beforeEach(angular.mock.inject(function($rootScope, $controller){
	        //create an empty scope
	        scope = $rootScope.$new();
	       $controller("HomeView", {$scope: scope});
	    }));
	    
	    // tests start here
		it('should have an empty list of items to start',function(){
			expect(scope.items.length).toBe(0);
		});
	
	}); 
	
	
});