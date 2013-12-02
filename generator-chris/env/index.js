'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var fs = require('fs');

var EnvGenerator = module.exports = function EnvGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('You called the env subgenerator with the argument ' + this.name + '.');
  this.properties = JSON.parse(this.readFileAsString('.generator-chris'));
  this.platform = this.properties.platform;
  this.framework = this.properties.framework;
  this.templateDir = this.platform + "/" + this.framework;
  this.appName = this.properties.appName;
  this.commonDir = this.properties.commonDir;

  console.log("Working with properties",this.properties);
};

util.inherits(EnvGenerator, yeoman.generators.NamedBase);

EnvGenerator.prototype.files = function files() {
	if(this.platform === "worklight"){
		console.log("Creating ",this.name," environment package for Worklight app",this.appName);
		this.envPath = "apps/" + this.appName + "/" + this.name;
	}else if(this.platform === "cordova"){
		console.log("Creating ",this.name," environment package for Cordova app");
		this.envPath = "www/" + this.name;
	}else{
		console.error("Only Worklight and Cordova based apps are supported at this time");
		return;
	};
	
	this.template(this.templateDir + "/" + "_app.profile.js",this.envPath + "/" + this.name + "app/app.profile.js");
	this.template(this.templateDir + "/" + "_package.json",this.envPath + "/" + this.name + "app/package.json");
	this.copy(this.templateDir + "/app.css",this.envPath  + "/" + this.name + "app/" + this.name + "app.css");

};

EnvGenerator.prototype.updateGruntConfig = function updateGruntConfig() {
	//Now update the grunt-config.json file
	this.gruntConfig = JSON.parse(this.readFileAsString('grunt-config.json'));
	if(this.platform === "worklight"){
		console.log("Updating Worklight app's grunt-config.json file to contain entries for env",this.name);
		var jshintfiles = this.gruntConfig.jshint.files;
		var exists = false;
		for(var x = 0; x < jshintfiles.length; x++){
			if(jshintfiles[x].indexOf(this.name + "app") > -1){
				exists = true;
				break;
			}//end if
		}//end for
		if(!exists){
			jshintfiles.push("apps/" + this.appName + "/" + this.name + "/" + this.name + "app/**/*.js");
			var watchfiles = this.gruntConfig.watch.files;
			watchfiles.push("apps/" + this.appName + "/" + this.name + "/" + this.name + "app/**/*");
			
			this.gruntConfig.clean[this.name + "app"] = ["apps/" + this.appName + "/" + this.name + "/" + this.name + "app"];
			var copy = this.gruntConfig.copy;
			copy[this.name + "app"] = {
					"expand": true,
					"cwd": "../Build/output/requirejsBuild/" + this.name + "app",
					"src": ["**","!**/css/**","!**/*_component.css"],
					"dest": "apps/" + this.appName + "/" + this.name + "/" + this.name + "app"
				};
			
		  // this.gruntConfig.requirejs.options.paths[this.name + "app"] = this.name + "app";
		   this.gruntConfig.requirejs[this.name + "app"] = {
				"options": {
					"baseUrl": "apps/" + this.appName + "/" + this.name + "/" + this.name + "app",
					"dir": "../Build/output/requirejsBuild/" + this.name + "app"
				}
			};
		}//end if
	}else if(this.platform === "cordova"){
		console.log("Updating Cordova app's grunt-config.json file to contain entries for env",this.name);
		//TODO:
		console.log("Not yet implemented");
	}else{
		console.error("Only Worklight and Cordova based apps are supported at this time");
		return;
	}//end if
	this.write("grunt-config.json",JSON.stringify(this.gruntConfig,null,4));
};

EnvGenerator.prototype.cssFiles = function cssFiles() {
	var envCss;
	var mainCss; 
	if(this.platform === "worklight"){
		mainCss = this.readFileAsString("apps/" + this.appName + "/" + this.name + "/css/main.css");
		envCss = "apps/" + this.appName + "/" + this.name + "/css/" + this.name + ".css"; 
	    if(!fs.existsSync(envCss)){
	        this.write(envCss,mainCss);
	        this.write("apps/" + this.appName + "/" + this.name + "/css/main.css","@import url('./" + this.name + ".css');\n@import url('../" + this.name + "app/" + this.name + "app.css');\n");
	    }else if(mainCss.indexOf(this.name + "app") == -1){
	    	this.write("apps/" + this.appName + "/" + this.name + "/css/main.css",mainCss + "\n@import url('../" + this.name + "app/" + this.name + "app.css');");
	    }//end if
	}else if(this.platform === "cordova"){
		//TODO
		console.log("Not yet implemented");
	}else{
		console.error("Only Worklight and Cordova based apps are supported at this time");
		return;
	}//end if 
	
};
