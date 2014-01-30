var app = angular.module("app",['ui.bootstrap']);

app.controller("appCtrl",function($scope,$http){
	$http({method: 'GET', url: 'results.json'}).
	  success(function(data, status, headers, config) {
	    // this callback will be called asynchronously
	    // when the response is available
		$scope.errors = data;
	  }).
	  error(function(data, status, headers, config) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
		 console.error("Failed to load jsHint results json file.  status: ",status);
	  });
});