define(["text!./config.json","angular","jquery"],function(configjson,angular,$){

	var appConfig = JSON.parse(configjson);
	var controllers = {};
	var transition = "";
	
	var environment = "common";      
	
	try{
		environment = WL.Client.getEnvironment();
	}catch(e){  
		console.warn("WL is undefined.  Probably means we are not running in worklight");
	}//end try
	if(appConfig.forceEnv){environment = appConfig.forceEnv;}
     
    var routes = appConfig.routes ? appConfig.routes : {};
	 
	var app = angular.module(appConfig.appName,appConfig.appDeps); 
	
	app.factory("CtrlLoader",["$q",function($q){
		return function(){  
			this.load = function(ctrl,$controllerProvider,$controller){
				var def = $q.defer();
				if(!(ctrl in controllers)){
					require([ctrl],function(c){	
						$controllerProvider.register(ctrl,c);
						controllers[ctrl] = true;//TODO: could change this to have a pointer to the controller function
						def.resolve();
						console.debug("Registered new controller on demand",ctrl);
					});
				}else{
					console.debug("Controller is already registered with angular",ctrl);
					def.resolve();
				}//end if
				
				return def.promise;
			};
		};		
	}]);
	 
	var registerRoute = function(routes,route,$routeProvider,$controllerProvider){
		if(routes[route].controller){
			routes[route].resolve = ['CtrlLoader',function(CtrlLoader){
				var l = new CtrlLoader();
				return l.load(routes[route].controller,$controllerProvider);
			}];
		}//end if
		
		if(route === "otherwise"){
			$routeProvider.otherwise(routes[route]);
		}else{
			$routeProvider.when(route,routes[route]);
		}//end if
		
	};
	app.config(["$routeProvider","$controllerProvider",function($routeProvider,$controllerProvider) {
		
		for(var route in routes){
			var envs = routes[route].envs ? routes[route].envs : {"common" : {}};
	        
			for(var env in envs){
				if(env === "common" || env === environment){
					//only register the route if it is for the common or current environment
					$.extend(routes[route],envs[env]);
				}//end if
				delete routes[route].envs;
				registerRoute(routes,route,$routeProvider,$controllerProvider);
				break;
			}//end for
		}//end for
	 }]);

	app.controller("AppCtrl",["$scope",function($scope){
		$scope.$on("$routeChangeStart",function(){
			$scope.animation = transition;
		});
	}]);
	
	require(appConfig.appDeps,function(){
		angular.bootstrap(document,[appConfig.appName]);
	});
	
    return {
    	transition : function(trans){
    		transition = trans;
    	},
    	
    	getAppConfig : function(){
    		return appConfig;
    	}
    };
});