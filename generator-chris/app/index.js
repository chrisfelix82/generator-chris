'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var fsextra = require("fs-extra");
var fs = require("fs");

var ChrisGenerator = module.exports = function ChrisGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
  this.projectName = this.options.env.cwd.substring(this.options.env.cwd.lastIndexOf("/") + 1);
};

util.inherits(ChrisGenerator, yeoman.generators.Base);

ChrisGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
      {
          name : 'framework',
          message: 'What framework are you using?',
          default: "bootstrap-angular",
          type: 'list',
          choices: [
          {
                  name : "Twitter Bootstrap with AngularJS",
                  value : "bootstrap-angular"
          },
          {
              name : "jQuery Mobile with AngularJS",
              value : "jqm-angular"
          },
          {
              name : "dojox/app",
              value : "dojox-app"
          }]
      }];

  this.prompt(prompts, function (props) {
    this.platform = "worklight";//TODO: support cordova later
    this.framework = props.framework;
    this.templateDir = this.platform + "/" + this.framework;

    if(this.platform === "worklight"){
        this.prompt([
            {name: 'appName',message: 'What is the name of your Worklight app?',default: 'main'}
        ],function(props){
            this.appName = props.appName;
            this.jsLibDir = "apps/" + this.appName + "/common/js/lib";
            this.commonDir = "apps/" + this.appName + "/common";
            this.defaultCss = this.readFileAsString("apps/" + this.appName + "/common/css/main.css");
            cb();
        }.bind(this));
    }else{
        //TODO: cordova
    	console.log("Cordova is not yet implemented");
    	this.appName = "change_me";
        this.jsLibDir = "www/js/lib";
        this.commonDir = "www";
        this.defaultCss = this.readFileAsString("www/css/index.css");
        cb();
    }//end if

  }.bind(this));
};

ChrisGenerator.prototype.app = function app() {

  var cb = this.async();
  this.template('_package.json', 'package.json');
  this.template(this.templateDir + '/_bower.json', 'bower.json');
  this.template('_.bowerrc','.bowerrc');

  fsextra.copy(this._sourceRoot + "/" + this.templateDir + "/common/commonapp", this.options.env.cwd + "/" + this.commonDir + "/commonapp",function(err){
        if (err) {
            console.error("Failed copying common files" + err);
            cb(err);
        }else{
            console.log("Success copying common files");
            cb();
        }//end if
  });

  if(this.platform === "worklight"){
      this.copy(this.templateDir + "/common/js/main.js",this.commonDir + "/js/main.js");
      //Create top level css imports
      if(!fs.existsSync(this.commonDir + "/css/common.css")){
          var transitionCss = "";
          if(this.framework === "bootstrap-angular"){
              this.copy(this.templateDir + "/css/animate-custom.css",this.commonDir + "/css/animate-custom.css");
              this.copy(this.templateDir + "/JSHintReporter.js","JSHintReporter.js");
              this.copy(this.templateDir + "/protractorConf.js","protractorConf.js");
              transitionCss =  this.readFileAsString(path.join(__dirname, '/templates/' + this.platform + "/" + this.framework + "/css/transitions.css"));
          }//end if
          this.defaultCss = this.defaultCss + "\n" + transitionCss;
          this.write(this.commonDir + "/css/common.css",this.defaultCss);
          this.write(this.commonDir + "/css/main.css","@import url('../js/lib/bootstrap/dist/css/bootstrap.min.css');@import url('../js/lib/bootstrap/dist/css/bootstrap-theme.min.css');@import url('./animate-custom.css');\n@import url('./common.css');\n@import url('../commonapp/commonapp.css');\n");
      }//end if
  }else{
	  this.copy(this.templateDir + "/common/js/index.js",this.commonDir + "/js/index.js");
      //Create top level css imports
      if(!fs.existsSync(this.commonDir + "/css/common.css")){
          this.write(this.commonDir + "/css/common.css",this.defaultCss);
          this.write(this.commonDir + "/css/index.css","@import url('./common.css');\n@import url('../commonapp/commonapp.css');\n");
      }//end if
  }//end if

  if(this.framework === "jqm-angular" || this.framework === "bootstrap-angular"){
	  this.copy(this.templateDir + "/common/js/require-main.js",this.commonDir + "/js/require-main.js");
  }//end if
  this.copy(this.templateDir + "/common/index.html",this.commonDir + "/index.html");

};

ChrisGenerator.prototype.gruntFile = function gruntFile() {

    var cb = this.async();
    //copy build project over
    fsextra.copy(this._sourceRoot + "/Build", this.options.env.cwd + "/../" + this.projectName + "Build",function(err){
        if (err) {
            console.error("Failed copying Build project" + err);
            cb(err);
        }else{
            console.log("Success copying Build project.  In Eclipse you will need to import the project that was created to see it.");
            cb();
        }//end if
    });

    this.template(this.templateDir + "/_Gruntfile.js","Gruntfile.js");
    this.template(this.templateDir + "/_grunt-config.json","grunt-config.json");
    var buildXML = this.readFileAsString(this._sourceRoot + "/Build/scripts/build.xml");
    buildXML = buildXML.replace(/<%= projectName %>/g,this.projectName);
    buildXML = buildXML.replace(/<%= appName %>/g,this.appName);
    this.write("../" + this.projectName +"Build/scripts/build.xml",buildXML);
    
    //Save dev environment properties for sub-generators to use
    var o = {
    		"platform"  : this.platform,
    		"framework" : this.framework,
    		"appName"   : this.appName,
    		"commonDir" : this.commonDir,
    		"projectName" : this.projectName
    };
    this.write(".generator-chris",JSON.stringify(o,null,4));
};

ChrisGenerator.prototype.tests = function tests() {

    if(this.framework === "jqm-angular" || this.framework === "bootstrap-angular"){
        var cb = this.async();
        this.template(this.templateDir + "/_karma.conf.js","karma.conf.js");
        //copy unit test dir over
        fsextra.copy(this._sourceRoot + "/" + this.templateDir + "/test/unit", this.options.env.cwd + "/test/unit",function(err){
            if (err) {
                console.error("Failed copying unit test directory" + err);
                cb(err);
            }else{
                console.log("Success copying unit test directory.");
                //Now copy over _test-main.js and angular-mocks.js
                this.template(this.templateDir + "/test/_test-main.js",this.options.env.cwd + "/test/test-main.js");
                this.copy(this.templateDir + "/test/angular-mocks.js",this.options.env.cwd + "/test/angular-mocks.js");
                //copy functional test dir over
                fsextra.copy(this._sourceRoot + "/" + this.templateDir + "/test/functional", this.options.env.cwd + "/test/functional",function(err){
                    if (err) {
                        console.error("Failed copying functional test directory" + err);
                        cb(err);
                    }else{
                        console.log("Success copying functional test directory.");
                        cb();
                    }//end if
                }.bind(this));
            }//end if
        }.bind(this));


    }//end if
};
