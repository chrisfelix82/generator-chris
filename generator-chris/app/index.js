'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var fsextra = require("fs-extra");

var ChrisGenerator = module.exports = function ChrisGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(ChrisGenerator, yeoman.generators.Base);

ChrisGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
      {
        name: 'platform',
        message: 'Hi there.  What platform are you running on? worklight | cordova',
        default: "worklight"
      },
      {
          name : 'framework',
          message: 'What framework are you using? jqm-angular | dojox-app | none',
          default: "jqm-angular"
      }];

  this.prompt(prompts, function (props) {
    this.platform = props.platform;
    this.framework = props.framework;
    this.templateDir = this.platform + "/" + this.framework;

    if(this.framework === "jqm-angular"){
        this.bowerDeps = JSON.stringify({
            "jquery-mobile-bower": "~1.3.2",
            "angular": "~1.2.2",
            "requirejs": "~2.1.9"
        },null,4);
    }else{
        this.bowerDeps = JSON.stringify({},null,4);
    }//end if

    if(this.platform === "worklight"){
        this.prompt([
            {name: 'appName',message: 'What is the name of your Worklight app?',default: 'main'}
        ],function(props){
            this.appName = props.appName;
            this.jsLibDir = "apps/" + this.appName + "/common/js/lib";
            this.commonDir = "apps/" + this.appName + "/common";
            cb();
        }.bind(this));
    }else{
        //TODO: cordova
        console.log('Sorry the cordova generator is not yet complete');
        cb();
    }//end if

  }.bind(this));
};

ChrisGenerator.prototype.app = function app() {

  var cb = this.async();
  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
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
  }else{
      //TODO cordova
      console.log("Sorry the cordova generator is not yet complete");
  }//end if

  //if(this.framework === "jqm-angular"){
      this.copy(this.templateDir + "/common/js/require-main.js",this.commonDir + "/js/require-main.js");
  //}

  this.copy(this.templateDir + "/common/index.html",this.commonDir + "/index.html");

};

ChrisGenerator.prototype.gruntFile = function gruntFile() {

    var cb = this.async();
    //copy build project over
    fsextra.copy(this._sourceRoot + "/Build", this.options.env.cwd + "/../Build",function(err){
        if (err) {
            console.error("Failed copying Build project" + err);
            cb(err);
        }else{
            console.log("Success copying Build project.  In Eclipse you will need to import the project that was created to see it.");
            cb();
        }//end if
    });

    this.template(this.templateDir + "/_Gruntfile.js","Gruntfile.js");
};
