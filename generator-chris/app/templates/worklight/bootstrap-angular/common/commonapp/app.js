define(["text!./config.json","angular","jquery"],function(configjson,angular,$){

	var appConfig = JSON.parse(configjson);
	//The animation class that will be applied to the data-ng-view in index.html.  This can be set by views before transition.
	var transition = "";
	var environment = "common";  
	var app = null;
	var controllers = {};
	var _controllerProvider;
	var _provide;
	var _compileProvider;  
	
	//Determine the environment that the app is running on
	try{
		environment = WL.Client.getEnvironment();
	}catch(e){  
		console.warn("WL is undefined.  Probably means we are not running in worklight");
	}//end try
	if(appConfig.forceEnv){environment = appConfig.forceEnv;}
    
	//Get the app routes for ngRoute
    var routes = appConfig.routes ? appConfig.routes : {};
	  
    /**
     * Private method to register a route in the app
     * @param routes {object} - a map of routes found in config.json
     * @param route {string} - the key in the routes map that we are processing the value for
     * @param routeProvider {object} - the $routeProvider from angular
     * @param controllerProvider {object} - the $controllerProvider from angular
     */ 
    var registerRoute = function(routes,route,routeProvider,controllerProvider){
		if(routes[route].controller){
			routes[route].resolve = ['CtrlLoader',function(CtrlLoader){
				var l = new CtrlLoader();
				return l.load(routes[route].controller,controllerProvider);
			}];
		}//end if
		
		if(route === "otherwise"){
			routeProvider.otherwise(routes[route]);
		}else{
			routeProvider.when(route,routes[route]);
		}//end if
		
	};
     
	/**
	 * The main bootstrap module fr the app.  Call the init() method after loading this module, to bootstrap the angularJS app
	 * @module commonapp/app
	 */
    var c = {
    	
    	/**
    	 * Init the app
    	 * @returns {object} the angularJS app module
    	 */
    	init: function(){
    		app = angular.module(appConfig.appName,appConfig.appDeps); 

    		/**
    		 * Define the root app controller that is found in index.html.  It will be used to listen to route change start, and set the
    		 * animation class on the data-ng-view.
    		 */
    		app.controller("AppCtrl",["$scope",function($scope){
    			$scope.$on("$routeChangeStart",function(){
    				$scope.animation = transition;
    			});
    		}]);
    		
    		/**
    	    * This is a factory used to dynamically load a view controller before navigating to the route where the view controller will
    	    * be used
    	    */
    	    app.factory("CtrlLoader",["$q",function($q){
    			return function(){  
    				this.load = function(ctrl,controllerProvider){
    					var def = $q.defer();
    					if(!(ctrl in controllers)){
    						require([ctrl],function(c){	
    							//Where we actually REGISTER THE VIEW CONTROLLER for a route with angular.
    							controllerProvider.register(ctrl,c);
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
    	    
    	    /**
    	     * Define the angular app config.  This is where we process the config.json file
    	     */
    	    app.config(["$routeProvider","$controllerProvider","$provide","$compileProvider",function($routeProvider,$controllerProvider,$provide,$compileProvider) {
    	    	//Modules may want to dynamically declare controllers, services, factories values and directives.  We need to allow this
    	    	_controllerProvider = $controllerProvider;
    	    	_provide = $provide;
    	    	_compileProvider = $compileProvider;
    	    	
    	    	
    			for(var route in routes){
    				var envs = routes[route].envs ? routes[route].envs : {"common" : {}};
    				for(var env in envs){
    					if(env === "common" || env === environment){
    						//We register all routes in the config.json file, but allow overriding the controller and templateURL per environment
    						//We do this by mixing in the environment specific object into the route object
    						$.extend(routes[route],envs[env]);
    					}//end if
    					delete routes[route].envs;
    					//Call the register route function to register the route
    					registerRoute(routes,route,$routeProvider,$controllerProvider);
    					break;
    				}//end for
    			}//end for
    			
    		 }]);
    	    
    	    
    	    angular.bootstrap(document,[appConfig.appName]);
    	    return app;
    	},
    	
    	/**
    	 * Set the view transition class.  This will set the animation class on the data-ng-view
    	 * @param trans {string} - the transition class name. 
    	 */
    	setTransition : function(trans){
    		transition = trans;
    	},
    	
    	/**
    	 * Get the currently set transition
    	 * @returns {string} the current value of the transition class
    	 */
    	getTransition : function(){
    		return transition;
    	},
    	
    	/**
    	 * @deprecated Please use setTransition instead
    	 */
    	transition : function(trans){
    		this.setTransition(trans);
    	},
    	
    	/**
    	 * Returns the commonapp/config.json file parsed as a JSON object
    	 * @returns {object} JSON object representing the commonapp/config.json file
    	 */
    	getAppConfig : function(){
    		return appConfig;
    	},
    	
    	/**
    	 * Returns the app module.  So instead of doing angular.module(this.getAppName()), you can just do this.getAppModule()
    	 * @returns {object} the angular.module(this.getAppName()) module
    	 */
    	getAppModule : function(){
    		return app;
    	},
    	
    	/**
    	 * Returns the app id
    	 * @returns {string} the appName found in commonapp/config.json
    	 */
    	getAppName : function(){
    		return appConfig.appName;
    	},
    	
    	/**
    	 * Registers a controller dynamically after bootstrap
    	 * @param name {string} - name of controller
    	 * @param constructor {function} - the controller function
    	 */
    	registerController : function(name,constructor) {
            _controllerProvider.register( name, constructor );
            app.controller(name,constructor);
            console.debug("registered controller dynamically",name);
        },
        
    	/**
    	 * Registers a service dynamically after bootstrap
    	 * @param name {string} - name of service
    	 * @param constructor {function} - the service constructor function
    	 */
        registerService : function( name, constructor ) {
            _provide.service( name, constructor );
            app.service(name,constructor);
            console.debug("registered service dynamically",name);
        },
        
        /**
    	 * Registers a factory dynamically after bootstrap
    	 * @param name {string} - name of factory
    	 * @param constructor {function} - the factory function
    	 */
        registerFactory : function( name, factory ) {
            _provide.factory( name, factory );
            app.factory(name,value);
            console.debug("registered factory dynamically",name);
        },
        
        /**
    	 * Registers a value dynamically after bootstrap
    	 * @param name {string} - name of value
    	 * @param constructor {function} - the value
    	 */
        registerValue : function( name, value ) {
            _provide.value( name, value );
            app.provide(name,value);
            console.debug("registered value dynamically",name);
        },
        
        /**
    	 * Registers a directive dynamically after bootstrap
    	 * @param name {string} - name of directive
    	 * @param constructor {function} - the factory function
    	 */
        registerDirective : function( name, factory ) {
            _compileProvider.directive( name, factory );
            app.directive(name,factory);
            console.debug("registered directive dynamically",name);
        }
    };
    
    c.init();
    return c;
	 
	
});