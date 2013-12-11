# generator-chris [![Build Status](https://secure.travis-ci.org/chrisfelix82/generator-chris.png?branch=master)](https://travis-ci.org/chrisfelix82/generator-chris)

A generator for [Yeoman](http://yeoman.io).


## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```
$ npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-chris from npm, run:

```
$ npm install -g generator-chris
```

This generator is based on previous work that I have done (see: yo dawg).  I thought that I would start to consolidate generators for IBM Worklight and Cordova based applications into this generator instead. So far, this generator works with Worklight (Cordova support will be added in future versions).  

What can you do?  
1. Scaffold a dojox/app based IBM Worklight project 
2. Scaffold a jQuery mobile with Angularjs based IBM Worklight project

## IBM Worklight

### dojox/app

Create a new Worklight project with dojo library support.  Then issue the following commands.  This will stub out a dojox/app project.

```
$ cd <to root of IBM Worklight project>
$ yo chris
```

You can then create a new environment with:

```
$ yo chris:env <worklight env name e.g. iphone>
```

You can create a new dojox/app view with the following command.  NOTE: View will be appended to the end of the view name automatically:

```
$ yo chris:view <name of view e.g. home>
```

You can start a rapid dev env by issuing the following command.  This will watch the files in your custom packages e.g. commonapp, iphoneapp.  Once a save is done, the files will be linted, and the browser will issue a live reload:

```
$ grunt dev
```

You can choose to build the project using requirejs with the following command.  See the grunt-config.json file for individual targets if you need:

```
$ grunt
```

You can choose to add documentation generation based on jsdoc3 (http://usejsdoc.org/#JSDoc3_Tag_Dictionary) to your code.  Executing the
following commands will add a lightweight requirejs + Express server (https://github.com/chrisfelix82/rexpress) to your workspace.  You can then view
generated docs at http://localhost:3434 after starting the server.

```
$ yo chris:docs init
$ cd ../rexpress
$ npm install
$ cd ../<mobile project>
$ grunt rexpress (starts the express server at port 3434)
```

You can generate the docs anytime with the following command.  Then visit http://localhost:3434/

```
$ grunt jsdoc
```



### jQuery mobile + Angular

Create a new Worklight project.  Then issue the following commands.  This will stub out a JQuery mobile app that uses Angular for data binding.

```
$ cd <to root of IBM Worklight project>
$ yo chris
```

You can then create a new environment with:

```
$ yo chris:env <worklight env name e.g. iphone>
```

You can create a new view with.  NOTE: View will be appended to the end of the view name automatically:

```
$ yo chris:view <name of view e.g. home>
```

You can start a rapid dev env by issuing the following command.  This will watch the files in your custom packages e.g. commonapp, iphoneapp.  Once a save is done, the files will be linted, and the browser will issue a live reload.
Unit tests will also be run (if any):

```
$ grunt dev
```

You can choose to build the project using requirejs with.  See the grunt-config.json file for individual targets if you need:

```
$ grunt
```

You can choose to add documentation generation based on jsdoc3 (http://usejsdoc.org/#JSDoc3_Tag_Dictionary) to your code.  Executing the
following commands will add a lightweight requirejs + Express server (https://github.com/chrisfelix82/rexpress) to your workspace.  You can then view
generated docs at http://localhost:3434 after starting the server.

```
$ yo chris:docs init
$ cd ../rexpress
$ npm install
$ cd ../<mobile project>
$ grunt rexpress (starts the express server at port 3434)
```

You can generate the docs anytime with the following command.  Then visit http://localhost:3434/

```
$ grunt jsdoc
```

### Notes

A project is created called "Build" in the workspace.  If you are using Eclipse, this project will not show up unless you create a new general project in the workspace with the name of "Build".  Once the project is visible, read the README.md file under Build/lib.  If you wish to use the grunt build, then you will have to have the IBM Worklight jars that ship with the production version of the product.  They are not distributed with this generator due to licensing restrictions.

If you wish to drive the build through RTC, the easiest way is to create a command line based jazz build definition.  Set the working directory to be your Worklight project's directory, and the command should simply be "grunt".  This is the same as you would do manually from the command line.  Of course the Workight tasks depend on ant and node, so you will have to install those on the build engine machine.

The build does not produce layers, it only minifies and obfuscates the source files.  If you are use to doing a dojox/app custom build, then you will have to set one up manually.  This generator does not deal with that.  If you are using dojox/app, you may consider using "yo dawg" - https://github.com/chrisfelix82/dawg, which has a build that is specifically tailored for custom dojo apps.


### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).
