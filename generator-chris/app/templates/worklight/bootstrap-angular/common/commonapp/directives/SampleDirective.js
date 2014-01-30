define(["module",
        "commonapp/app",
        "text!./SampleDirective.html"],function(module,app,templateString){
	
	app.registerDirective('sampleDirective', function() {
	    return {
	      restrict: 'A',
	      scope: {
	        greeting: '='
	      }, 
	      
	     link: function(scope, elem, attrs){
	    	 console.debug(scope.greeting);
	     },
	 
	      template: templateString
	    };
	});
	
});