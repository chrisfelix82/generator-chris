var functionalTestApp = angular.module("functionalTestApp",['ui.bootstrap']);

functionalTestApp.controller("IndexPageCtrl",function($scope,$http,$modal){
	$http({method: 'GET', url: 'results.json'}).
	  success(function(data, status, headers, config) {
	    // this callback will be called asynchronously
	    // when the response is available
		$scope.tests = data;
		//Determine the percentage of passed vs. failed
		$scope.numPassed = data.passed.length;
		$scope.numFailed = data.failed.length;
		$scope.numRun = $scope.numPassed + $scope.numFailed;
		$scope.passedPct = ""+ $scope.numPassed/$scope.numRun * 100;
		$scope.failedPct = ""+ $scope.numFailed/$scope.numRun * 100;
	  }).
	  error(function(data, status, headers, config) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
		 console.error("Failed to load functional test results json file.  status: ",status);
	  });
	
	$scope.showScreenshot = function(path){
		 var modalInstance = $modal.open({
		      template: "<div><img style='width: 100%;height:100%' src='" + path + "'></img></div>"
		    });
	};
	
	$scope.showTrace = function(trace){
		 var modalInstance = $modal.open({
		      template: "<div><pre>" + trace + "</pre></div>"
		    });
	}
	
	
});
