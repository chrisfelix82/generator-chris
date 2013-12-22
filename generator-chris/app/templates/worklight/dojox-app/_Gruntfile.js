module.exports = function(grunt) {

    require('time-grunt')(grunt);
	var config = grunt.file.readJSON('grunt-config.json');
    var genConfig = grunt.file.readJSON(".generator-chris");
    var projectName = genConfig.projectName;
	config.pkg = grunt.file.readJSON('package.json');
	config.requirejs.options.fileExclusionRegExp =  /native|\.min|\.xml|\.txt|\.zip*/;
    grunt.initConfig(config);

    //Load existing tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.registerTask('rexpress','starts the rexpress server',function(){
        grunt.util.spawn({
            cmd : 'node',
            args: ['../rexpress/app.js'],
            opts: {stdio: 'inherit'}
        },grunt.task.current.async());
    });
    
    //Start Worklight tasks
    grunt.registerTask('buildwlapp','Build Worklight app .wlapp file',function(){
        grunt.util.spawn({
                 cmd : 'ant',
                 args: ['buildwlapp','-f','../' + projectName + 'Build/scripts/build.xml'],
                 opts: {stdio: 'inherit'}
         },grunt.task.current.async());
    });
    
    grunt.registerTask('deploywlapp','Deploy Worklight app .wlapp file',function(){
        grunt.util.spawn({
                 cmd : 'ant',
                 args: ['deploywlapp','-f','../' + projectName + 'Build/scripts/build.xml'],
                 opts: {stdio: 'inherit'}
         },grunt.task.current.async());
    });
    
    grunt.registerTask('buildadapters','Build Worklight adapters',function(){
        grunt.util.spawn({
                 cmd : 'ant',
                 args: ['buildadapters','-f','../' + projectName + 'Build/scripts/build.xml'],
                 opts: {stdio: 'inherit'}
         },grunt.task.current.async());
    });

    grunt.registerTask('deployadapters','Deploy Worklight adapters',function(){
        grunt.util.spawn({
                 cmd : 'ant',
                 args: ['deployadapters','-f','../' + projectName + 'Build/scripts/build.xml'],
                 opts: {stdio: 'inherit'}
         },grunt.task.current.async());
    });
    
    grunt.registerTask('buildWAR','Build Worklight WAR',function(){
        grunt.util.spawn({
                 cmd : 'ant',
                 args: ['buildWAR','-f','../' + projectName + 'Build/scripts/build.xml'],
                 opts: {stdio: 'inherit'}
         },grunt.task.current.async());
    });

    grunt.registerTask('deployWAR_Liberty','Deploy Worklight WAR',function(){
        grunt.util.spawn({
            cmd : 'ant',
            args: ['deployWAR_Liberty','-f','../' + projectName + 'Build/scripts/build.xml'],
            opts: {stdio: 'inherit'}
        },grunt.task.current.async());
    });

    grunt.registerTask('configure_DB2','Creates the databases required by Worklight on DB2',function(){
        grunt.util.spawn({
            cmd : 'ant',
            args: ['configure_DB2','-f','../' + projectName + 'Build/scripts/build.xml'],
            opts: {stdio: 'inherit'}
        },grunt.task.current.async());
    });

    grunt.registerTask('undeployWAR_Liberty','Uninstall Worklight WAR',function(){
        grunt.util.spawn({
            cmd : 'ant',
            args: ['undeployWAR_Liberty','-f','../' + projectName + 'Build/scripts/build.xml'],
            opts: {stdio: 'inherit'}
        },grunt.task.current.async());
    });
    //end Worklight tasks

    //Developer tasks
    grunt.registerTask('dev',['watch']);

    //Build & deploy tasks
    grunt.registerTask('default', ['jshint','jsdoc','requirejs','clean','copy','clean:themes','copy:themes','buildwlapp','buildadapters','deployadapters','deploywlapp']);
    grunt.registerTask('updateWAR',['undeployWAR_Liberty','buildWAR','deployWAR_Liberty']);
};