'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var DocsGenerator = module.exports = function DocsGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('You called the docs subgenerator with the argument ' + this.name + '.');
};

util.inherits(DocsGenerator, yeoman.generators.NamedBase);

DocsGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // have Yeoman greet the user.
    console.log(this.yeoman);

    var prompts = [
        {
            name: 'rexpressVer',
            message: 'What version of rexpress would you like to use?',
            default: "master"
        }
    ];

    this.prompt(prompts, function (props) {
        this.rexpressVer = props.rexpressVer;
        cb();
    }.bind(this));
};

DocsGenerator.prototype.files = function files() {

    var cb = this.async();
    this.remote('chrisfelix82', 'rexpress',this.rexpressVer,function (err, remote) {
        if (err) {
            console.log("error pulling in rexpress version: ",this.rexpressVer,err);
            return cb(err);
        }//end if
        console.log("Success pulling rexpress version: ", this.rexpressVer);
        remote.directory('../' + this.rexpressVer, path.join(this.options.env.cwd, '../rexpress'));
        this.copy("backend/server.js","../rexpress/backend/server.js");
        this.copy("frontend/jshint/index.html","../rexpress/frontend/jshint/index.html");
        this.copy("frontend/jshint/index.js","../rexpress/frontend/jshint/index.js");
        this.copy("frontend/test/functional/index.html","../rexpress/frontend/test/functional/index.html");
        this.copy("frontend/test/functional/index.js","../rexpress/frontend/test/functional/index.js");
        this.copy("frontend/index.html","../rexpress/frontend/index.html");
        this.copy("frontend/index.js","../rexpress/frontend/index.js");
        this.copy("bower.json","../rexpress/bower.json");

        cb();
    }.bind(this),(this.rexpressVer === "master"));
    console.log("NOTE: Don't forget to do an npm install from within the rexpress project.  Also a bower install if you need to pull in front end libs.  By default, the bower.json file pulls in dojo 1.9");
};
