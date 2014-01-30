'use strict';
define(["module","angular","commonapp/directives/SampleDirective","jquery"],function(module,angular,SampleDirective,$){
 
	describe(module.id, function(){
		var $compile;
	    var $rootScope;
	 
	    // Load the myApp module, which contains the directive
	    beforeEach(angular.mock.module('app'));
	 
	    // Store references to $rootScope and $compile
	    // so they are available to all tests in this describe block
	    beforeEach(inject(function(_$compile_, _$rootScope_){
	      // The injector unwraps the underscores (_) from around the parameter names when matching
	      $compile = _$compile_;
	      $rootScope = _$rootScope_;
	    }));
	    
	    it('should have an exciting greeting', function() {
	        // Compile a piece of HTML containing the directive
	        var element = $compile("<div sample-directive greeting='\"hi there\"'></div>")($rootScope);
	        // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
	        $rootScope.$digest();
	        // Check that the compiled element contains the templated content
	        expect(element.html()).toContain("hi there!!");
	    });
	});
		
	
	
});