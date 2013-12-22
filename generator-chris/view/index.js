'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var fs = require('fs');

var ViewGenerator = module.exports = function ViewGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);
  this.properties = JSON.parse(this.readFileAsString('.generator-chris'));
  this.platform = this.properties.platform;
  this.framework = this.properties.framework;
  this.templateDir = this.platform + "/" + this.framework;
  this.appName = this.properties.appName;
  this.commonDir = this.properties.commonDir;
  this.appConfig = JSON.parse(this.readFileAsString(this.commonDir + "/commonapp/config.json"));
};

util.inherits(ViewGenerator, yeoman.generators.NamedBase);

ViewGenerator.prototype.askFor = function askFor() {
	  var cb = this.async();

	  // have Yeoman greet the user.
	  console.log(this.yeoman);

	  var prompts = [
	  {
		  name: 'packageName',
		  message: 'What is the package name that you wish to create the view under?',
		  default: "commonapp/controllers"
	   }];
	  
	  if(this.framework === "dojox-app"){
		  prompts.push({
			   name: 'parentView',
			   message: 'What is the parent view (if any) of this view? Format is dot path. e.g. tabTemplate.tab1View',
			   default: null
		   });
		  prompts.push({
				   type: "confirm",
				   name: 'isTemplate',
				   message: 'Is this view a template?',
				   default: false
		  });
	  }//end if
	 

	  this.prompt(prompts, function (props) {
		  this.viewName = this.name;
		  this.packageName = props.packageName;
		  this.parentView = props.parentView;
		  this.isTemplate = props.isTemplate;
		  this.component = this.packageName.substring(this.packageName.lastIndexOf("/") + 1);
		  if(this.isTemplate){
			  this.viewSuffix = "Template";
		  }else{
			  this.viewSuffix = "View";
		  }//end if
          this.appRoot = this.options.env.cwd;
          if(this.framework === "dojox-app"){
        	  this.configJson = JSON.parse(this.readFileAsString(this.commonDir + "/commonapp/config.json"));
          }//end if
          
	    cb();
	  }.bind(this));
	};

ViewGenerator.prototype.files = function files() {
	this.envDir = this.packageName.substring(0,this.packageName.indexOf("/") - 3);

    var pkg;
    if(this.platform === "worklight"){
    	if(this.envDir === "common"){
            pkg = this.commonDir + "/" + this.packageName
        }else{
            pkg = "apps/" + this.appName + "/" + this.envDir + "/" + this.packageName;
        }//end if
    }else{
    	//assume cordova
    	if(this.envDir === "common"){
            pkg = this.appRoot + "/www/" + this.packageName
        }else{
            pkg = this.appRoot + "/merges/" + this.envDir + "/" + this.packageName;
        }//end if
    }//end if
    

	this.fileName = this.viewName + this.viewSuffix;
	
	if(!fs.existsSync(pkg)){
		//Make component directories if they do not exist
		this.mkdir(pkg);
		this.mkdir(pkg + "/images");
		this.mkdir(pkg + "/nls");
		this.mkdir(pkg + "/css");
	}//end if
	
	if(this.framework === "dojox-app"){
		this._createDojoView(pkg);
	}else{
		//assume cordova
		this._createJQMAngularView(pkg);
	}//end if
	
};


ViewGenerator.prototype._createJQMAngularView = function _createJQMAngularView(pkg) {
	this.template(this.templateDir + "/_SomeView.js",pkg + "/" + this.fileName + ".js");
	this.template(this.templateDir + "/_SomeView.html",pkg + "/" + this.fileName + ".html");
	
	this.template(this.templateDir + "/css/_SomeView.css",pkg + "/css/" + this.fileName + ".css");
	this.template(this.templateDir + "/nls/_SomeView.js",pkg + "/nls/" + this.fileName + ".js");
	
	console.log("Checking if " + pkg + "/" + this.component + "_component.css exists...");
	if(fs.existsSync(pkg + "/" + this.component + "_component.css")){
		console.log("It exists, so I will append to it");
		var componentCSS = this.readFileAsString(pkg + "/" + this.component + "_component.css");
		if(componentCSS.indexOf("./css/" + this.fileName + ".css") === -1){
			//Only append css import if it does not exist
			componentCSS += "\n@import url('./css/" + this.fileName + ".css');";
			this.write(pkg + "/" + this.component + "_component.css",componentCSS);
		}//end if
	}else{
		console.log("It does not exist, so I will create it");
		this.template(this.templateDir +"/_someComponent.css",pkg + "/" + this.component + "_component.css");
		var path = pkg.split("/");
		var parentDir = path[path.length - 2];
		console.log("Adding component css file to " + parentDir +".css");

		var appCss;
        try{
           appCss = this.readFileAsString(pkg + "/../" + parentDir + "_component.css");
            if(appCss.indexOf(this.component + "/" + this.component + "_component.css") === -1){
                //only append if import does not exist
                appCss += "\n@import url('" + this.component + "/" + this.component + "_component.css');";
                this.write(pkg + "/../" + parentDir + "_component.css",appCss);
            }//end if
        }catch(e){
            console.log("Could not find",pkg + "/../" + parentDir + "_component.css","adding component css to",this.envDir + "app.css");
        }//end try


	}//end if

    //Add the new view to the config.json file

    if(this.frameworkm === "jqm-angular"){
        if(!(this.fileName in this.appConfig.routes)){
            this.appConfig.routes[this.fileName] = {
                "template" :  this.packageName + "/" + this.fileName + ".html",
                "controller" : this.packageName + "/" + this.fileName
            };
            this.write(this.commonDir + "/commonapp/config.json",JSON.stringify(this.appConfig,null,4));
        }//end if
    }else{
        //assume bootstrap-angular
        if(!("/" + this.fileName in this.appConfig.routes)){
            this.appConfig.routes["/" + this.fileName] = {
                "templateUrl" :  this.packageName + "/" + this.fileName + ".html",
                "controller" : this.packageName + "/" + this.fileName
            };
            this.write(this.commonDir + "/commonapp/config.json",JSON.stringify(this.appConfig,null,4));
        }//end if
    }//end if

};


ViewGenerator.prototype._createDojoView = function _createDojoView(pkg) {
	this.copy(this.templateDir + "/someView.js",pkg + "/" + this.fileName + ".js");
	if(this.isTemplate){
		this.template(this.templateDir + "/_someTemplate.html",pkg + "/" + this.fileName + ".html");
	}else{
		this.template(this.templateDir + "/_someView.html",pkg + "/" + this.fileName + ".html");
	}//end if
	
	this.template(this.templateDir + "/css/_someView.css",pkg + "/css/" + this.fileName + ".css");
	this.template(this.templateDir + "/nls/_someView.js",pkg + "/nls/" + this.fileName + ".js");
	
	console.log("Checking if " + pkg + "/" + this.component + "_component.css exists...");
	if(fs.existsSync(pkg + "/" + this.component + "_component.css")){
		console.log("It exists, so I will append to it");
		var componentCSS = this.readFileAsString(pkg + "/" + this.component + "_component.css");
		if(componentCSS.indexOf("./css/" + this.fileName + ".css") === -1){
			//Only append css import if it does not exist
			componentCSS += "\n@import url('./css/" + this.fileName + ".css');";
			this.write(pkg + "/" + this.component + "_component.css",componentCSS);
		}//end if
	}else{
		console.log("It does not exist, so I will create it");
		this.template(this.templateDir +"/_someComponent.css",pkg + "/" + this.component + "_component.css");
		var path = pkg.split("/");
		var parentDir = path[path.length - 2];
		console.log("Adding component css file to " + parentDir +"_component.css");

        var appCSS;
        try{
            appCSS = this.readFileAsString(pkg + "/../" + parentDir + ".css");
            if(appCSS.indexOf(this.component + "/" + this.component + "_component.css") === -1){
                //only append if import does not exist
                appCSS += "\n@import url('" + this.component + "/" + this.component + "_component.css');";
                this.write(pkg + "/../" + parentDir + ".css",appCSS);
            }//end if
        }catch(e){
            console.log("Could not read",pkg + "/../" + parentDir + ".css","Please create manually.");
        }//end try


	}//end if 
	
	//now we need to write the new view to the config.json file
	if(!this.configJson.views){this.configJson.views = new Object();}
	if(!this.parentView){
		this.configJson.views[this.fileName] = new Object();
		this.configJson.views[this.fileName].template = this.packageName + "/" + this.fileName + ".html";
		this.configJson.views[this.fileName].controller = this.packageName + "/" + this.fileName + ".js";
		this.configJson.views[this.fileName].nls = this.packageName + "/nls/" + this.fileName;
	}else{
		var parent = this.configJson;
		var path = this.parentView.split(".");
		for(var x = 0; x < path.length; x++){
			if(!parent.views){
				parent.views = new Object();
			}//end if
			parent = parent.views[path[x]];
			if(!parent.views){
				parent.views = new Object();
			}//end if
			parent = parent.views;
		}//end for
		
		parent[this.fileName] = new Object();
		parent[this.fileName].template = this.packageName + "/" + this.fileName + ".html";
		parent[this.fileName].controller = this.packageName + "/" + this.fileName + ".js";
		parent[this.fileName].nls = this.packageName + "/nls/" + this.fileName;
	}//end if
	
	if(this.platform === "worklight"){
		this.write(this.commonDir + "/commonapp/config.json",JSON.stringify(this.configJson,null,4));
	}else{
		//assume cordova
		this.write(this.appRoot + "/www/commonapp/config.json",JSON.stringify(this.configJson,null,4));
	}//end if
};
