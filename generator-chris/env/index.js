'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

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
	this.copy(this.templateDir + "/app.css",this.envPath + "/" + this.name + "app.css");
};
