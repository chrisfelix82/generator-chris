module.exports = function(grunt) {

	var config = grunt.file.readJSON('grunt-config.json');
	config.pkg = grunt.file.readJSON('package.json');
	config.requirejs.options.fileExclusionRegExp =  /native|\.min|\.xml|\.txt|\.zip*/;
    grunt.initConfig(config);

    //Load existing tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    
    //Start Worklight tasks
    grunt.registerTask('buildwlapp','Build Worklight app .wlapp file',function(){
        grunt.util.spawn({
                 cmd : 'ant',
                 args: ['buildwlapp','-f','../Build/scripts/build.xml'],
                 opts: {stdio: 'inherit'}
         },grunt.task.current.async());
    });
    
    grunt.registerTask('deploywlapp','Deploy Worklight app .wlapp file',function(){
        grunt.util.spawn({
                 cmd : 'ant',
                 args: ['deploywlapp','-f','../Build/scripts/build.xml'],
                 opts: {stdio: 'inherit'}
         },grunt.task.current.async());
    });
    
    grunt.registerTask('buildadapters','Build Worklight adapters',function(){
        grunt.util.spawn({
                 cmd : 'ant',
                 args: ['buildadapters','-f','../Build/scripts/build.xml'],
                 opts: {stdio: 'inherit'}
         },grunt.task.current.async());
    });

    grunt.registerTask('deployadapters','Deploy Worklight adapters',function(){
        grunt.util.spawn({
                 cmd : 'ant',
                 args: ['deployadapters','-f','../Build/scripts/build.xml'],
                 opts: {stdio: 'inherit'}
         },grunt.task.current.async());
    });
    
    grunt.registerTask('buildWAR','Build Worklight WAR',function(){
        grunt.util.spawn({
                 cmd : 'ant',
                 args: ['buildWAR','-f','../Build/scripts/build.xml'],
                 opts: {stdio: 'inherit'}
         },grunt.task.current.async());
    });
    //end Worklight tasks

    grunt.registerTask('default', ['jshint','requirejs','clean','copy','buildwlapp','buildadapters']);

};